{ pkgs, ... }: {
  dotenv.enable = true;
  languages.javascript.enable = true;
  languages.typescript.enable = true;
  languages.javascript.bun.enable = true;
  languages.javascript.bun.install.enable = true;
}
