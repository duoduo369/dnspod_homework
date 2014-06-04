module.exports = (match) ->
  match '', 'home#index'
  match '!/login', 'auth#login'
