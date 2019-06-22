# Express Backend API Example

## Create from Scratch:

1. `npx express-generator --no-view --git <repo-name>`
1. `git init`
1. `git add . && git commit`

1. `touch README.md`
1. `rm -rf public` - this is an API only example
   1. In `app.js` remove static middleware line: `app.use(express.static(path.join(__dirname, 'public')));`
   2. In `routes/index.js` change `res.render('index', { title: 'Express' });` to `res.send({ title: 'Express' });`.
1. Verify if your express app is still working:
   1. `yarn install`
   1. `yarn start`
   1. In browser open urls:
      - `http://localhost:3000/` - `{"title":"Express"}`
      - `http://localhost:3000/users` - `respond with a resource`
1. `git add . && git commit`

1. add `engines` section in `package.json`
   1. Use the current active LTS version of node
   1. Use moderately new version of `yarn`
