const imageModules = import.meta.glob("../../assets/images/**/*.{png,jpg,jpeg,JPG,JPEG,gif,webp,svg}", {
  eager: true,
  import: "default",
});

export function imageUrl(relativePath) {
  const key = `../../assets/images/${relativePath}`;
  return imageModules[key] || "";
}
