### models

### Product
- name: string
brandName: string

### challenges
1. Sign up form (need to pass firstName and LastName as well as "sign in" details)
2. Add product listing to React
3. Add create product to API
4. Add create product form to React
5. Add update product to API
6. Add edit product form to React

### more challenges
- Add wishlist listing to React, and add/remove buttons to each product
- Add categories to API: products belong to many categories, categories have many products. There may be several ways to model this! (see the orange headings here for categories: https://www.amazon.com.au/gp/site-directory/ref=nav_shopall_btn)
- Add categories nav to React
- Add dotenv package to api, and use for mongo URI, JWT secret


# Mongoose vs ActiveRecord


## Defining models

### ActiveRecord
```
> rails generate model Song name artist album genre duration_seconds:integer
> rails db:migrate
```

```rb
gangnam_style = Song.new(name: 'Gangnam Style', artist: 'Psy', album: 'Psy 6 (Six Rules), Part 1', genre: 'K-pop', duration_seconds: 219)
if gangnam_style.save
  # Successfully saved
else
  # Handle error
end
```

### Mongoose
```js
const mongoose = require('mongoose');

const Song = mongoose.model('Song', {
  name: String,
  artist: String,
  album: String,
  genre: String,
  durationSeconds: Number
});
```

```js
const gangnamStyle = new Song({ name: 'Gangnam Style', artist: 'Psy', album: 'Psy 6 (Six Rules), Part 1', genre: 'K-pop', durationSeconds: 219 })
gangnamStyle.save()
  .then(() => {
    // Successfully saved
  })
  .catch((error) => {
    // Handle error
  })
```


## Queries cheat sheet

| ActiveRecord | Mongoose |
---------------|----------|
| Model.**all** | Model.**find**() |
| Model.**where**(attributes) | Model.**find**(conditions) |
| Model.**find**(id) | Model.**findById**(id) |
| Model.**find_by**(attributes) | Model.**findOne**(conditions) |
| Model.**new**(attributes) | new Model(attributes) |
| Model.**create**(attributes) | Model.**create**(attributes) |
| Model.**destroy**(id) | Model.**findByIdAndRemove**(id) |
| Model.**find_by**(conditions).**update**(changes) | Model.**findOneAndUpdate**(conditions, changes, { new: true, runValidators: true }) |
| Model.**where**(conditions).**update_all**(changes) | Model.**updateMany**(conditions, changes) |
| Model.**count** | Model.**count**() |
| record.**save** | record.**save**() |
| record.**destroy** | record.**remove**() |
| record.**includes**(:director) | record.**populate**('director') |
| Model.**find_or_create_by**(attributes) | Model.**findOneAndUpdate**(attributes, attributes, { upsert: true, runValidators: true }) |
| Model.**increment_counter**(:attribute_name, id) | Model.**findByIdAndUpdate**(id, { $inc: { attribute: 1 } }) |



## Relations

### ActiveRecord
```
> rails generate model Artist name
> rails generate model Album name artist:references
> rails generate model Genre name
> rails generate model Song name artist:references album:references genre:references duration_seconds:integer
> rails db:migrate
```

```rb
class Artist
  has_many :albums
  has_many :songs
end

class Album
  belongs_to :artist
  has_many :songs
end

class Genre
  has_many :songs
end

class Song
  belongs_to :artist
  belongs_to :album
  belongs_to :genre
end
```

```rb
psy = Artist.create!(name: 'Psy')
psy_6_rules = Album.create!(name: 'Psy 6 (Six Rules), Part 1', artist: psy)
k_pop = Genre.create!(name: 'K-pop')

gangnam_style = Song.new(name: 'Gangnam Style', artist: psy, album: psy_6_rules, genre: k_pop, duration_seconds: 219)
if gangnam_style.save
  # Successfully saved
else
  # Handle error
end
```

### Mongoose
```js
const mongoose = require('mongoose');

const Artist = mongoose.model('Artist', {
  name: String
});

const Album = mongoose.model('Album', {
  name: String,
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  }
});

const Genre = mongoose.model('Genre', {
  name: { // Only one genre can have a particular name
    type: String,
    unique: true
  }
});

const Song = mongoose.model('Song', {
  name: String,
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre'
  },
  durationSeconds: Number
});
```

```js
async function seed() {
  const psy = await Artist.create({ name: 'Psy' })
  const psy6Rules = await Album.create({ name: 'Psy 6 (Six Rules), Part 1', artist: psy })
  const kPop = await Genre.create({ name: 'K-pop' })
  const gangnamStyle = new Song({ name: 'Gangnam Style', artist: psy, album: psy6Rules, genre: kPop, durationSeconds: 219 })
  gangnamStyle.save()
    .then(() => {
      // Successfully saved
    })
    .catch((error) => {
      // Handle error
    })
}
```

```js
Artist.create({ name: 'Psy' })
  .then((psy) => (
    Album.create({ name: 'Psy 6 (Six Rules), Part 1', artist: psy })
      .then((psy6Rules) => (
        Genre.create({ name: 'K-pop' })
          .then((kPop) => {
            const gangnamStyle = new Song({ name: 'Gangnam Style', artist: psy, album: psy6Rules, genre: kPop, durationSeconds: 219 })
            gangnamStyle.save()
              .then(() => {
                // Successfully saved
              })
              .catch((error) => {
                // Handle error
              })
          )
      })
  ))
```
