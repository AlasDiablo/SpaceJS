# SpaceJS

[![](https://data.jsdelivr.com/v1/package/gh/alasdiablo/spacejs/badge)](https://www.jsdelivr.com/package/gh/alasdiablo/spacejs)

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li>
            <a href="#tools">Tools</a>
            <ul>
                <li>
                    <a href="#stars">Stars</a>
                </li>
            </ul>
        </li>
        <li><a href="#download--mirror">Download | Mirror</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## About The Project

**SpaceJS** is a small collection of js script for creating visual effect, background image and more.

#### Stars

Stars is a small script for adding a background star on a specific dom element.
- [Demo](https://alasdiablo.github.io/SpaceJS/stars.html)

Add a star background to body:
```js
stars(
    document.body,     // Required: Target dom element
    0.25,              // Required: Density of star
    { red: true,       // Optional: Enable red star
      blue: true,      // Optional: Enable blue star
      white: true,     // Optional: Enable white star
      width: 600,      // Optional: Size of the canvas use as background
      height: 600,     // Optional: Size of the canvas use as background
      animated: false, // Optional: Enable animation (currently in wip/not implemented)
      size: 1 }        // Optional: Size of a star
);
```

Add stars to your html file:
```html
<script src="https://cdn.jsdelivr.net/gh/alasdiablo/spacejs@1.0.3/dist/stars.min.js"></script>
```

### Download | Mirror

- [jsDelivr](https://www.jsdelivr.com/package/gh/alasdiablo/spacejs)
- [Github](https://github.com/AlasDiablo/SpaceJS/releases)

## Contributing

If you want to contribute you can to it via:

- [Bug report](https://github.com/AlasDiablo/SpaceJS/issues)
- [Feature request](https://github.com/AlasDiablo/SpaceJS/issues)
- [Bug fix](https://github.com/AlasDiablo/SpaceJS/pulls)
- [Any useful code change](https://github.com/AlasDiablo/SpaceJS/pulls)
- If you want to give a donation you can't because we don't have a Patreon(or anything like this).

## License

- The source code is under [MIT](https://github.com/AlasDiablo/SpaceJS/blob/master/LICENSE)

## Acknowledgements

- [AlasDiablo](https://github.com/AlasDiablo) / [lIotaMiu](https://github.com/liotamiu) - Original author, main contributor
- [Any Contributor](https://github.com/AlasDiablo/SpaceJS/graphs/contributors) - Bug report, bug fix
- And people who use my lib!
