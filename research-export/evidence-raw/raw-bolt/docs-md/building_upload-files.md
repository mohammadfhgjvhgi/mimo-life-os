> ## Documentation Index
> Fetch the complete documentation index at: https://support.bolt.new/llms.txt
> Use this file to discover all available pages before exploring further.

# Attach files to your project

> Upload images and other files to use in your project or as context for Bolt.

From the chatbox, you can attach files to give Bolt visual references, add assets to your project, or share documents and code for Bolt to work with. If you want to add a file directly to your project files without using tokens, you can also use Code view.

## File requirements

The maximum file size is **10 MB** for Free plans and **100 MB** for any Pro plan.

| File type     | Supported formats                                                                                                                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Image         | `.jpg` `.jpeg` `.png` `.gif` `.webp` `.svg`                                                                                                                                                                                             |
| Document      | `.pdf` `.txt` `.doc` `.docx` `.csv` `.log` `.md` `.tex` `.latex`                                                                                                                                                                        |
| Code          | `.py` `.ipynb` `.js` `.mjs` `.cjs` `.jsx` `.html` `.css` `.scss` `.sass` `.ts` `.tsx` `.java` `.cs` `.php` `.c` `.cc` `.cpp` `.cxx` `.h` `.hh` `.hpp` `.rs` `.swift` `.go` `.rb` `.kt` `.kts` `.scala` `.lua` `.sql` `.asm` `.ino` `.s` |
| Config & data | `.ini` `.cfg` `.config` `.json` `.yaml` `.yml` `.toml`                                                                                                                                                                                  |
| Shell         | `.sh` `.bash` `.zsh` `.bat`                                                                                                                                                                                                             |

You can upload file types for a wide range of programming languages, but Bolt only builds JavaScript-based applications (see [Supported technologies](/concepts/supported-technologies)). Use files from other programming languages as a reference to guide Bolt, or ask Bolt to convert them into JavaScript.

## Attach a file from the chatbox

You can attach files when creating a new project on the Bolt homepage or in an existing project. To attach a file, do one of the following:

1. In the bottom-left corner of the chatbox, click the **plus icon**, then click **Attach file** and select your files.
2. Drag and drop the files into the chatbox.

How Bolt uses the file depends on how you describe it in your prompt. For example:

* To add the file directly to your project: `Use the attached file as a logo in the header of the website.`
* To give Bolt a visual reference for style or layout: `Using the attached image for inspiration, change the site's colors, fonts, and other styles to match the image style.`

<Tip>
  If you attached an image but it isn't showing in your project preview, try adding it directly to your project in Code view instead.
</Tip>

## Attach a file from Code view

Adding a file directly in [Code view](/building/using-bolt/code-view) stores it in your project files. Use this method when you need Bolt to continue referencing the file as your project evolves. Because you're adding the file straight to your project, this method doesn't consume any tokens.

<Info>
  If you're using Bolt in Safari, Code view [is read-only](/concepts/supported-technologies#safari). Use the chatbox to attach your files instead.
</Info>

1. Click the **`<>` icon** to switch to Code view.
2. Click the **Public** folder to expand it.
3. Drag and drop your image file into the Public folder.
4. Right-click the image file and select **Copy Relative Path**.

To reference the file in a prompt, paste the path and tell Bolt how to use it. For example: `Use public/hero-image.png for the header image.`
