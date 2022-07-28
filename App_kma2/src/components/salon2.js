import niceColors from 'nice-color-palettes'
const colors=[
    ...niceColors[1].slice(1, niceColors[1].length),
    ...niceColors[55].slice(0,3),
];


// const images=[
//     {image: require('../images/image_select/ic_Clothes.png')},
//     {image: require('../images/image_select/ic_Food.png')},
//     {image: require('../images/image_select/ic_medical.png')},
//     {image: require('../images/image_select/ic_taxi.png')},
//     {image: require('../images/image_select/ic_working.png')},
// ]
const countriesWithFlags = [
    {title: 'Clothes', image: require('../images/image_select/ic_Clothes.png')},
    {title: 'Food', image: require('../images/image_select/ic_Food.png')},
    {title: 'Medical', image: require('../images/image_select/ic_medical.png')},
    {title: 'Taxi', image: require('../images/image_select/ic_taxi.png')},
    {title: 'Other', image: require('../images/image_select/ic_working.png')},  
  ];
const images=[
    require('../images/image_select/ic_Clothes.png'),
    require('../images/image_select/ic_Food.png'),
    require('../images/image_select/ic_medical.png'),
    require('../images/image_select/ic_taxi.png'),
    require('../images/image_select/ic_working.png'),
]
const images2={
    "Clothes" : require('../images/image_select/ic_Clothes.png'),
    "Food" : require('../images/image_select/ic_Food.png'),
    "Medical": require('../images/image_select/ic_medical.png'),
    "Taxi": require('../images/image_select/ic_taxi.png'),
    "Other":require('../images/image_select/ic_working.png'),
}
const names=["Clothes","Food","Medical","Taxi","Other"]
var data2=[
    {key: 0,title:"Clothes",total:111,note:"mua quần áo trung cư 20",day:"17/5/2022"},
    {key: 1,title:"Clothes",total:222,note:"mua thức ăn",day:"17/5/2022"},
    {key: 2,title:"Clothes",total:333,note:"mua thuốc quân bác",day:"17/5/2022"},
    {key: 3,title:"Clothes",total:444,note:"đi taxi anh em nhe",day:"17/5/2022"},
    {key: 4,title:"Clothes",total:555,note:"mua chuột gaminh",day:"17/5/2022"},
    {key: 5,title:"Clothes",total:666,note:"mua phổn quán na",day:"17/5/2022"},
    {key: 6,title:"Clothes",total:777,note:"nhập táo ấn độ",day:"17/5/2022"},
    {key: 7,title:"Clothes",total:888,note:"mua chó gy",day:"17/5/2022"},
    {key: 8,title:"Clothes",total:999,note:"chiến nhật tân",day:"17/5/2022"},
    {key: 9,title:"Clothes",total:101,note:"lonelyyy",day:"17/5/2022"},
    {key: 10,title:"Clothes",total:102,note:"happyyy",day:"18/5/2022"},
]


export default data2.map((item,index)=>({
    ...item,
   // key: faker.datatype.uuid(),
    color: colors[index%colors.length],
    image: images2[item.title],
    name: item.title,
}));
export{
    colors,
    images2,
    countriesWithFlags
}