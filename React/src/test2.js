const array = [
    { id: 1, name: 'Pedro'},
    { id: 2, name: 'Miko'},
    { id: 3, name: 'Bear'},
    { id: 4, name: 'Teddy'},
    { id: 5, name: 'Mouse'}
  ];
  
  const filterArray = [
      {id: 1},{
          id: 3}, {id:5}];
  
  const result = array.filter(({ id }) => filterArray.map(e => e.id).includes(id));
  
  console.log(result);
  console.log(1 == "1");

  arr = [1,2,3,4,5]
  arr.push(6);

  console.log(arr);
  arr1 = arr.filter(e => e != 5 )
  console.log(arr1.includes(2));
