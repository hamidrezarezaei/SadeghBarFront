import { manipulateAsync } from 'expo-image-manipulator';
// =================================================================
export const ResizeImage = async(photo) => {
    const manipResult = await manipulateAsync(
        photo.uri,
        [{ resize: { width: 670, height: 893 } }],
        { compress: 1, format: 'jpeg' }
      );
      return manipResult;
}