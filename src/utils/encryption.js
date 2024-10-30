import { Buffer } from 'buffer';

const ENCRYPTION_KEY = 'your-secret-key'; // In production, use a secure key management system

export const encryptMessage = async (message) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(ENCRYPTION_KEY),
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );

  return {
    encrypted: Buffer.from(encrypted).toString('base64'),
    iv: Buffer.from(iv).toString('base64')
  };
};

export const decryptMessage = async (encryptedData) => {
  const decoder = new TextDecoder();
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(ENCRYPTION_KEY),
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  );

  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: Buffer.from(encryptedData.iv, 'base64')
    },
    key,
    Buffer.from(encryptedData.encrypted, 'base64')
  );

  return decoder.decode(decrypted);
};