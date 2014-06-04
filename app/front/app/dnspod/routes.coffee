module.exports = (match) ->
  match '', 'home#index'
  match '!/domains', 'home#index'
  match '!/login', 'auth#login'
  match '!/domains/:domain_id/records', 'domain#records'
