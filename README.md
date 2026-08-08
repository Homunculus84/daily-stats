# Daily Stats

A mock RPG character sheet that turns everyday life into a daily stat screen.
Rolled fresh each day. Built to run on a [reTerminal Sticky](https://www.seeedstudio.com/sticky/) as a small ambient display.


## Query Params

By passing any of the following query parameters in the URL, you can personalise your character sheet:

| Param   | Accepted values                           | Description                                                    |
|---------|-------------------------------------------|----------------------------------------------------------------|
| `title` | any string                                | Sheet title                                                    |
| `name`  | any string                                | Adventurer name                                                |
| `level` | any string                                | Level                                                          |
| `mode`  | `light`, `dark`                           | Set the theme                                                  |

**Example:**

```
index.html?title=Profile&name=Sir+Lancelot&level=90&mode=dark
```
