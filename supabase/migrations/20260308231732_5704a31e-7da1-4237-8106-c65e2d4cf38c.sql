-- Allow authenticated users to upload to posts/ folder
CREATE POLICY "Authenticated users can upload post images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'pride-social-network' AND (storage.foldername(name))[1] = 'posts');

-- Allow anyone to view post images (public bucket)
CREATE POLICY "Anyone can view post images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'pride-social-network' AND (storage.foldername(name))[1] = 'posts');

-- Allow users to delete their own post images
CREATE POLICY "Users can delete own post images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'pride-social-network' AND auth.uid()::text = (storage.foldername(name))[2]);