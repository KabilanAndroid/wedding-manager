import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toApiError } from '../api/API';
import type { ApiError } from '../api/ApiTypes';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB (Cloudinary free-plan image limit)

/** The fields we use from Cloudinary's upload response. */
export type CloudinaryUploadResult = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
};

export type UploadOptions = {
  /** Cloudinary folder to store the image in, e.g. 'services' or 'avatars'. */
  folder?: string;
};

export type ImageUrlOptions = {
  width?: number;
  height?: number;
  /** How to fit the image into width/height. Default 'fill' (crop to exact size). */
  crop?: 'fill' | 'fit' | 'scale' | 'thumb';
};

/**
 * Build a delivery URL for an image already on Cloudinary.
 * Adds f_auto/q_auto so Cloudinary serves the best format and quality for the browser.
 *
 * @example
 * getImageUrl('services/abc123')                          // full size
 * getImageUrl('services/abc123', { width: 400, height: 300 }) // 400x300 thumbnail
 */
export function getImageUrl(publicId: string, options: ImageUrlOptions = {}): string {
  const { width, height, crop = 'fill' } = options;
  const transforms = ['f_auto', 'q_auto'];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width || height) transforms.push(`c_${crop}`);
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(',')}/${publicId}`;
}

/**
 * Upload images to Cloudinary from the browser and track progress.
 *
 * @example
 * const { upload, uploading, progress, error } = useCloudinary();
 *
 * const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
 *   const file = e.target.files?.[0];
 *   if (!file) return;
 *   const result = await upload(file, { folder: 'services' });
 *   if (result) saveToDb(result.secure_url, result.public_id);
 * };
 */
export function useCloudinary() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<ApiError | null>(null);
  const [result, setResult] = useState<CloudinaryUploadResult | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  // Cancel an in-flight upload if the component unmounts.
  useEffect(() => () => controllerRef.current?.abort(), []);

  /** Upload a file. Resolves to the result, or null if it failed or was cancelled. */
  const upload = useCallback(
    async (file: File, options: UploadOptions = {}): Promise<CloudinaryUploadResult | null> => {
      const fail = (message: string) => {
        setError({ message, status: null, data: null });
        return null;
      };

      if (!CLOUD_NAME || !UPLOAD_PRESET) {
        return fail('Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.');
      }
      if (!file.type.startsWith('image/')) return fail('Please choose an image file.');
      if (file.size > MAX_FILE_SIZE) return fail('Image must be 10 MB or smaller.');

      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      if (options.folder) formData.append('folder', options.folder);

      setUploading(true);
      setProgress(0);
      setError(null);

      try {
        const { data } = await axios.post<CloudinaryUploadResult>(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData,
          {
            signal: controller.signal,
            onUploadProgress: (e) => {
              if (e.total) setProgress(Math.round((e.loaded / e.total) * 100));
            },
          },
        );
        setResult(data);
        return data;
      } catch (err) {
        if (axios.isCancel(err)) return null;
        // Cloudinary sends errors as { error: { message } }.
        const apiError = toApiError(err);
        const cloudinaryMessage = (apiError.data as { error?: { message?: string } } | null)?.error?.message;
        setError(cloudinaryMessage ? { ...apiError, message: cloudinaryMessage } : apiError);
        return null;
      } finally {
        if (controllerRef.current === controller) {
          controllerRef.current = null;
          setUploading(false);
        }
      }
    },
    [],
  );

  const cancel = useCallback(() => controllerRef.current?.abort(), []);

  const reset = useCallback(() => {
    controllerRef.current?.abort();
    setUploading(false);
    setProgress(0);
    setError(null);
    setResult(null);
  }, []);

  return { upload, cancel, reset, uploading, progress, error, result, getImageUrl };
}
