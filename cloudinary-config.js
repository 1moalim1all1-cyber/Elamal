// بيانات Cloudinary فقط — لا تضع API Secret هنا نهائيًا.
export const cloudinaryConfig = {
  cloudName: 'sg5ompuf',
  uploadPreset: 'elamal_upload',
  folder: 'elamal-site'
};

export const cloudinaryEnabled = Boolean(
  cloudinaryConfig.cloudName &&
  cloudinaryConfig.uploadPreset &&
  !cloudinaryConfig.cloudName.startsWith('PUT_') &&
  !cloudinaryConfig.uploadPreset.startsWith('PUT_')
);
