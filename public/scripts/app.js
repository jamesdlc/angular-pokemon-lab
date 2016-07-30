/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */
console.log("Connected?");
angular
    .module('pokeApp', [])
    .controller('PokemonAppController', PokemonAppController);

PokemonAppController.$inject = ['$http'];

function PokemonAppController($http) {
    var vm = this;
    vm.newPoke = {};

    $http({
        method: 'GET',
        url: 'https://super-crud.herokuapp.com/pokemon'
    }).then(function successCallback(response) {
        // console.log(vm.data);
        // console.log(response);
        vm.pokemon = response.data.pokemon;
        console.log(response.data.pokemon);
    }, function errorCallback(response) {
        console.log('There was an error getting the data', response);
    });

    vm.createPoke = function() {
        console.log("CREATE");
        $http({
            method: 'POST',
            url: 'https://super-crud.herokuapp.com/pokemon',
            data: vm.newPoke,
        }).then(function successCallback(response) {
            vm.pokemon.push(response.data);
        }, function errorCallback(response) {
            console.log('There was an error posting the data', response);
        });
    };


    vm.deletePoke = function(poke) { //come back to this later, page doesn't render SAP
        $http({
            method: 'DELETE',
            url: 'https://super-crud.herokuapp.com/pokemon/' + poke
        }).then(function successCallback(json) {
            console.log(json);
            var index = vm.pokemon.indexOf(poke);
            vm.pokemon.splice(index, 1);
        }, function errorCallback(response) {
            console.log(poke);
            console.log('There was an error deleting the data', response);
        });
    };

    vm.editPoke = function(poke) {
        console.log(poke);
        $http({
            method: 'PUT',
            url: 'https://super-crud.herokuapp.com/pokemon/' + poke._id,
            data: poke
        }).then(function successCallback(json) {
            console.log(json);
        }, function errorCallback(response) {
            console.log('There was an error deleting the data', response);
        });
    };
}
