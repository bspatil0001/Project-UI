var app = angular.module("myApp",[]);

app.controller("myController",function($q){
  var vm=this;
  vm.seats = [];

  vm.chars=['A','B','C','D','E','F','G','H','I','J'];

  angular.forEach(vm.chars,function(value,key){
    vm.row=[];
    for(var j=1;j<=12;j++){
      vm.row.push({name:value+j, status:'empty'});
    }
    vm.seats.push(vm.row);
  });

  function init() {
    $q.when(localStorage.getItem('confirmed'))
    .then(function (data) {
      data = JSON.parse(data);
      vm.confirmed = data;
      angular.forEach(data,function(value) {
        angular.forEach(value.seats,function(seat) {
          var i = seat.charCodeAt(0)-65;
          var j = parseInt(seat.substring(1));
          vm.seats[i][j-1].status = 'reserved';
        });

      });
    })
  }
  init();

  var seatsSel = [];
  vm.addSeat = function(seat) {
    if(seat.status == "selected"){
      seat.status = "empty";
      seatsSel.splice(seatsSel.indexOf(seat.name), 1);
    }
    else if(seatsSel.length < vm.seatcount){
      seat.status = 'selected';
      if(seatsSel.indexOf(seat.name)==-1)
        seatsSel.push(seat.name);
    }
    else {
      alert('exceeded no of seats!');
    }
  };

  vm.persons=[];
  vm.confirmSeats = function () {
    if(seatsSel.length != 0 && seatsSel.length == vm.seatcount){
      angular.forEach(seatsSel,function(value) {
        var i = value.charCodeAt(0)-65;
        var j = parseInt(value.substring(1));
        vm.seats[i][j-1].status = 'reserved';
      });
      vm.persons.push({
        name: vm.name,
        count: vm.seatcount,
        seats: seatsSel
      });
      angular.forEach(vm.confirmed, function(persons){
  				vm.persons.push(vm.confirmed);
  		});

      $q.when(localStorage.getItem('confirmed'))
      .then(function (data) {
          if(data){
            data = JSON.parse(data);
            data.push(vm.persons[0]);
            localStorage.setItem('confirmed', JSON.stringify(data));
          }
          else {
            localStorage.setItem('confirmed', JSON.stringify(vm.persons));
          }
          init();
          vm.persons = [];
        });

      seatsSel = [];
    }
    else{
      alert("Invalid No of seat selection");
    }

  };

  vm.theaders = ['Name','No. of Seats', 'Seats'];
  // console.log(vm.seats);
});
