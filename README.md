# SambaDNA 3.0

SambaDNA is a POS application created to demonstrate new ideas to solve operational problems on retails, restaurants or similar businesses. Cloud POS systems is a big step forward on POS industry. However most Cloud POS Applications needs good wireless coverage and requires Internet connection to be able to operate. Even though they supports offline usage, few limited operations avaliable while working offline. Permanent server connection requirement leads to serious operational issues for extremely busy locations like tills, bars or kitchens. SambaDNA built with distributed networking principles to allow smooth communication between terminals and server. Same principles also works between servers for connecting branches of franchise business.

## More Info

Visit https://github.com/emreeren/pmpos3/wiki to have more information about the project.

## Demo

https://emreeren.github.io/pmpos3

On first run you need to make few configurations to enable features. You can read Demo Tutorials to have an idea about how SambaDNA works.

**Demo Tutorials**

- [1. Creating first ticket](https://github.com/emreeren/pmpos3/wiki/1.-Creating-First-Ticket)
- [2. Adding Payments](https://github.com/emreeren/pmpos3/wiki/2.-Adding-Payments)
- [3. Selecting Tables](https://github.com/emreeren/pmpos3/wiki/3.-Choosing-Tables)
- [4. Simplifying Tables](https://github.com/emreeren/pmpos3/wiki/4.-Simplifying-Payments)
- [5. Understanding Rules](https://github.com/emreeren/pmpos3/wiki/5.-Understanding-Rules)
- [6. Misc Products](https://github.com/emreeren/pmpos3/wiki/6.-Misc-Products)
  

## Development Build

```
$ git clone https://github.com/SambaDNA/sambadna.git
$ cd sambadna
$ npm install
$ npm run start
```

## Contribution

SambaDNA is a point of sale project started by [SambaPOS](https://sambapos.com) team. Merchants will use SambaDNA to manage & operate their businesses. If you are interested you can submit issues, share your ideas or send your PR's.

## List of projects we used to build SambaDNA

| Project                                                           | Description                             |
| ----------------------------------------------------------------- | --------------------------------------- |
| [y-js](http://y-js.org/)                                          | CRDT to share card commits with clients |
| [react](https://reactjs.org/)                                     | To create UI Components                 |
| [redux](https://redux.js.org/)                                    | To manage UI State                      |
| [immutable-js](https://facebook.github.io/immutable-js/)          | To make UI State immutable              |
| [recharts](https://github.com/recharts/recharts)                  | To add charts to dashboard              |
| [nools-ts](https://github.com/taoqf/nools-ts)                     | To build and execute rules              |
| [material-ui](http://www.material-ui.com/)                        | For mobile UI components                |
| [typescript](https://www.typescriptlang.org/)                     | To add type safety to JS                |
| [blueimp-tmpl](https://github.com/blueimp/JavaScript-Templates)   | To create string templates              |
| [react-virtualized](https://github.com/bvaughn/react-virtualized) | To create virtual lists                 |  |
