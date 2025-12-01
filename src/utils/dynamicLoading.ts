import dynamic from "next/dynamic";

export function lazyModal<T extends object = any>(path: string) {
  return dynamic<T>(() => import(path), {
    ssr: false,
    loading: () => null
  });
}
