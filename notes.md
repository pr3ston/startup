# CS 260 Notes

[My startup - Simon](https://simon.pviloria.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 54.81.96.130
Launching my AMI I initially put it on a private subnet. Even though it had a public IP address and the security group was right, I wasn't able to connect to it.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

### Structure

The `<body>` tag is the top level for content. `<header>, <main>, <footer>` are all children of the body tags.

`<header>`:
Contains a `<p>` paragracph, with a `<span>` and a `<nav>` containing multiple `<div>`isons

`<main>`:
Contains multiple `<section>`s and contain either an unordered list or a `<table>`. Also contains an `<aside>` for content that doesn't fit the content flow of the sections.

`<footer>`:
Has a `<div>` with a single `<span>`

#### Block and Inline

Block elements are meant to be a distinct block in the flow of content. An inline element is meant to be inline with the content flow for a block element. Inline elements don't disrupt the flow of blow element's conent.

### Input

| Element  | Meaning                          | Example                                        |
| -------- | -------------------------------- | ---------------------------------------------- |
| form     | Input container and submission   | `<form action="form.html" method="post">`      |
| fieldset | Labeled input grouping           | `<fieldset> ... </fieldset>`                   |
| input    | Multiple types of user input     | `<input type="" />`                            |
| select   | Selection dropdown               | `<select><option>1</option></select>`          |
| optgroup | Grouped selection dropdown       | `<optgroup><option>1</option></optgroup>`      |
| option   | Selection option                 | `<option selected>option2</option>`            |
| textarea | Multiline text input             | `<textarea></textarea>`                        |
| label    | Individual input label           | `<label for="range">Range: </label>`           |
| output   | Output of input                  | `<output for="range">0</output>`               |
| meter    | Display value with a known range | `<meter min="0" max="100" value="50"></meter>` |

#### Input Element

| Type           | Meaning                           |
| -------------- | --------------------------------- |
| text           | Single line textual value         |
| password       | Obscured password                 |
| email          | Email address                     |
| tel            | Telephone number                  |
| url            | URL address                       |
| number         | Numerical value                   |
| checkbox       | Inclusive selection               |
| radio          | Exclusive selection               |
| range          | Range limited number              |
| date           | Year, month, day                  |
| datetime-local | Date and time                     |
| month          | Year, month                       |
| week           | Week of year                      |
| color          | Color                             |
| file           | Local file                        |
| submit         | button to trigger form submission |

##### Attributes

| Attribute | Meaning                                                                             |
| --------- | ----------------------------------------------------------------------------------- |
| name      | The name of the input. This is submitted as the name of the input if used in a form |
| disabled  | Disables the ability for the user to interact with the input                        |
| value     | The initial value of the input                                                      |
| required  | Signifies that a value is required in order to be valid                             |

## CSS

This part was a bit of a doozy. I used a bit of bootstrap to help with the formatting. I had to use grid elements to format my page to how I liked it. I also had to make a bit of my own CSS, creating different CSS files for each of my pages. Bootstrap was definitely the fastest and easiest way to design my pages.

With bootstrap, you just essentially 'plug and play' as the css classes are already made for you.

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS, which was a pain. I ended us using more specific classes to help separate the css files. I have also sorted my files accordingly.

## React Part 2: Reactivity

This was honestly a bit tough. I had to think of how I wanted to go about retreiving data from a database and I had to find out how to handle which channel data to display. That took the most time. I am still yet to implement button functionality that is supposed to create a channel and send a message. I would have to wait until I have a database to work with.

## Service

This took a while but was fun overall. It was a good refresher on how CORS and middleware are implemented. I ran into some issues with trying to update information on my frontend.

## DB

This one wasn't too bad but took me a little longer than expected. Pretty straight forward though.
