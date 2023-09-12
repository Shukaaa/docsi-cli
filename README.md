# Docsi CLI

The Docsi CLI is a command line interface for Docsi. <br/>
It allows you to create Docsi projects easily.

## What is Docsi?

- 📄 Docsi is a static site generator for documentation. <br/>
- ✍️ It is written in JS and uses Markdown as its markup language. <br/>
- 👶 It is designed to be simple to use and easy to extend. <br/>
- 🎨 It already comes with a default theme, but you can easily change it. <br/>
- ⚡ You can also run and build it super fast, because it uses Vite and Grunt. <br/>

## How to use?

### Installation

Install the Docsi CLI globally.

```bash
npm install -g @docsi/cli
```

### Create a new project

Create a new Docsi project.

```bash
docsi new <project-name>
```

## Environment

### Development
1. Install the grunt CLI. <br/>

```bash
npm install -g grunt-cli
```

2. Start the development server. <br/>

```bash
npm run dev
```

The development server will be started on `http://127.0.0.1:5173/temp/index.html`. <br/>
> Note: The development server is only for development purposes. <br/>
> The static site will be generated in the `dist` folder. <br/>

### Build
To build the static site, you can run `npm run build` in the root folder. <br/>
The static site will be generated in the `dist` folder. <br/>

### Folder Structure
```
- node_modules/
- src/
    - assets/
        - logo.png
    - content/
        - example/
            - One.md
            - Two.md
            - Three.md
        - Introduction.md
    - css/
        - default.css
        - highlight.css
        - sidebar.css
    - js/
        - sidebar.js
    - template.html
- .gitignore
- docsi.config.json
- package.json
- package-lock.json
- README.md
- vite.config.js
```
- The `node_modules` folder contains all the dependencies. <br/>
- The `src` folder contains all the source files. <br/>
    - The `assets` folder contains all the assets. <br/>
        - The `logo.png` file is the logo of the static site. <br/>
    - The `content` folder contains all the content files. <br/>
        - All the files in the `content` folder will be converted to HTML. (Currently only Markdown is supported) <br/>
    - The `css` folder contains all the CSS files (All files get compressed to one file "`style.css`"). <br/>
        - The `default.css` file is the default CSS file that contains the styling for the Markdown Elements. <br/>
        - The `highlight.css` file is the CSS file for the code highlighting theme. <br/>
        - The `sidebar.css` file is the CSS file for the sidebar. <br/>
    - The `js` folder contains all the JS files. (All files get compressed to one file "`script.js`"). <br/>
        - The `sidebar.js` file is the JS file for the sidebar. <br/>
    - The `template.html` file is the template file for the static site. <br/>
- The `.gitignore` file contains all the files that should be ignored by git. <br/>
- The `docsi.config.json` file contains the configuration for the static site & build process (see more below). <br/>
- The `package.json` file contains all the dependencies and scripts. <br/>
- The `package-lock.json` file contains all the dependencies and their versions. <br/>
- The `README.md` file contains the documentation for the static site. <br/>
- The `vite.config.js` file contains the configuration for the development server. <br/>

> Important: Please make sure if you create a new file in content/ then you have to register it to the `docsi.config.json` file. <br/>

### Configuration
As you can see, there is a `docsi.config.json` file in the root folder. <br/>

```json
{
    "pageOrder": [
        "Introduction",
        "example/One",
        "example/Two",
        "example/Three"
    ],
    "build": {
      "minifyJs": true,
      "minifyCss": true,
      "buildDir": "dist"
    }
}
```

The `pageOrder` array contains the order of the pages and how they will be displayed. <br/>
The `build` object contains the build options. <br/>

## Examples

### Styling

You can write normal HTML in the Markdown files. <br/>
So you can easily assign classes to elements. <br/>

<div class="my-class">
    <p>My paragraph</p>
</div>

```html
<div class="my-class">
    <p>My paragraph</p>
</div>
```

Now you can create a new CSS file in the `css` folder and add the following code:

```css
.my-class {
    background-color: red;
}
```

The css file gets automatically imported in the `template.html` file, if it's in the `css` folder. <br/>

### Code Highlighting

You can use code highlighting in the Markdown files. <br/>
Just use the following syntax:

```js
console.log("Hello World!");
```

````markdown
```js
console.log("Hello World!");
```
````

> If you want to change the code highlighting theme, you can change it in the `highlight.css` file. <br/>

If you want to remove the highlighting, you can delete the `highlight.css` file and remove the following line in the `template.html` file:

```html
<!-- Highlight.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>
<script>hljs.highlightAll();</script>
```

### Images

You can use images in the Markdown files. <br/>
Just use the following syntax:

<img src="assets/logo.png" alt="Logo" style="width: 10%; height: 10%;" />

````markdown
![Logo](assets/logo.png)
````

or

```html
<img src="assets/logo.png" alt="Logo" />
```

> If you want to change the logo or add a new one, you can change it in the `assets` folder. <br/>

### Adding new pages

If you want to add a new page, you can create a new Markdown file in the `content` folder. <br/>
Then you have to register it in the `docsi.config.json` file. <br/>

```json
{
    "pageOrder": [
        "Introduction",
        "example/One",
        "example/Two",
        "example/Three",
        "your_folder/MyPage"
    ],
    "build": {
      "minifyJs": true,
      "minifyCss": true
    }
}
```

> Please note that docsi only creates single page applications. <br/>
> So all theses pages will be rendered in the same HTML file. You can just define the order of the pages. <br/>

### Adding Scripts

If you want to add a new script, you can create a new JS file in the `js` folder. <br/>
You don't have to register it anywhere, it gets automatically imported in the `template.html` file, if you put it in the `js` folder. <br/>

```html
<button onclick="alertHelloWord()">Add a new script!</button>
```

now you can create a new JS file in the `js` folder and add the following code:

```js
function alertHelloWord() {
    window.alert("Hello World!");
}
```

### template.html

The `template.html` file is the template file for the static site. <br/>
It contains the HTML structure of the static site. <br/>
You can add your own HTML code to it. <br/>

> There you can change the title of the static site. <br/>