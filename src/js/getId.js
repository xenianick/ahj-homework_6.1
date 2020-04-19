export default function getId() {
  const id = (+new Date()).toString(16);
  return id;
}
