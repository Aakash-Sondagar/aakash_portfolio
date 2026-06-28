type FileAppender = {
  file: (importPath: string, filePath: string) => void;
};

export function registerMdxFiles(appender: FileAppender) {
  appender.file("@/mdx-components", "./mdx-components.tsx");
}
