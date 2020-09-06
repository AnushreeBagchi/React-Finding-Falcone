GeekTrust Finding Falcone coding challenge. This project is done using React framework.

### Build
This project uses webpack and create React app for the build . The build can be triggered using npm scripts. The project is built and deployed here (https://finding-falcone-anushree.netlify.app/
)

```
yarn build
```

Start the project 

```
yarn start
```

### HTML/CSS
Project is semantically structed using HTML5 Semantic elements like `header`, `footer` and `section` elements. 

### Extensible 
The project uses Redux to decouple the State and the components which itself do not have any state. Adding another planet is as simple as adding another destination in `Constants.js` with no other change to code.


### Responsive
The project use `Material UI` and is built Mobile First. The project uses Containers and grids to enforce responsiveness across all device breakpoints.

### Tests
The project uses `Jest` to test Stores and the UI.

### Dependency Management

The project uses Yarn (instead of NPM) as its dependency manager. The Dependencies are loaded as NPM modules using import that Webpack is able to understand.

### Modularity

The project uses `Redux` to extract the state management out of the React components.The React components themselves are *Dumb* and only react to Props passed from stores.

### Error Handling
The *Find Falcone* button will only be enabled when all radio groups have atleast one selection. Colour coding will help the user understand which one is missing a selection. In case of server error , error messages inform the user and nudges her to try again.

-------

King Shan has received intelligence that Al Falcone is in hiding in one of these 6 planets - DonLon, Enchai, Jebing,
Sapir, Lerbin & Pingasor. However he has limited resources at his disposal & can send his army to only 4 of these
planets.
This coding problem is to help King Shan find Al Falcone.

This UI will enable King Shan to -
- select 4 planets to search (out of the total 6)
- select which space vehicles to send to these planets
- see how much time it will take for the vehicles to reach their targets &
- show final result of success or failure 

Check this out @ https://finding-falcone-anushree.netlify.app/

![alt text](https://media.giphy.com/media/WoF5Y6OzurdHLSrPcS/giphy.gif "Image of the project")

