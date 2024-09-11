# Elixir Audit Plugin

Required tools:

- This plugin works with mix, a cli with said binary installed is necessary
- Make sure to run ``` mix deps.get ``` before running the plugin
- This tool requires deps.audit library installed so make sure to add it to your mix.exs file

```shell
{:mix_audit, "~> 2.1"},
```

## Build source

1. Run npm install in the parent directory to install required dependencies
2. Go to  the plugin folder ``` cd plugin-elixir-audit ```
3. Run ``` npx tsc ```
