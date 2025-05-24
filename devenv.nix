{ pkgs, ... }: {
  dotenv.enable = true;
  languages.javascript.enable = true;
  languages.javascript.npm.enable = true;
  languages.typescript.enable = true;
}
