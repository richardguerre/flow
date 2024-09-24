# gitignore files without affecting the .gitignore file

To ignore files in a Git repository, you typically use a `.gitignore` file in the root directory of your project, not directly in the `.git` directory. However, if you don't want to affect the .gitignore file, you can do so by editing the `.git/info/exclude` file. This file acts like a local `.gitignore` for the repository but won't be committed or shared with others.

Here’s how you can do it:

1. **Open the `.git/info/exclude` file**: This file is located in the `.git` directory of your repository.

   ```bash
   nano .git/info/exclude
   ```
   Or cmd+p in VSCode and type `.git/info/exclude` to open the file.

2. **Add the patterns of files you want to ignore**: Just like in a `.gitignore` file, you can add file patterns to this file. For example:

   ```plaintext
   # Ignore all .log files
   *.log

   # Ignore specific file
   secrets.txt

   # Ignore a directory
   temp/
   ```

3. **Save and close the file**: After editing, save the changes and exit your text editor.

### Example

If you want to ignore all `.log` files and a `temp` directory locally without affecting the `.gitignore` file that is tracked in the repository, you would add the following lines to `.git/info/exclude`:

```plaintext
*.log
temp/
```

### Key Points

- **`.gitignore` vs `.git/info/exclude`**: The `.gitignore` file is used for project-wide ignore rules and is typically committed to the repository, affecting all clones of the repository. The `.git/info/exclude` file is specific to your local copy of the repository and is not shared with others.

- **No need to create the `.git/info/exclude` file**: This file usually exists by default in any Git repository. If it doesn’t, you can create it manually.

This approach is useful when you want to ignore files in your local environment without modifying the project's `.gitignore` file that others might depend on.