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
const images=[
    require('../images/image_select/ic_Clothes.png'),
    require('../images/image_select/ic_Food.png'),
    require('../images/image_select/ic_medical.png'),
    require('../images/image_select/ic_taxi.png'),
    require('../images/image_select/ic_working.png'),
]

const data=[
    {key: 0,name:"Clothes",total:111,},
    {key: 1,name:"Food",total:222},
    {key: 2,name:"Medical",total:333},
    {key: 3,name:"Taxi",total:444},
    {key: 4,name:"Other",total:555},
]



export const detailsIcons =[
    {color: '#9FD7F1', icon: 'isv'},
    {color: '#F3B000', icon: 'Trophy'},
    {color: '#F2988F', icon: 'edit'},
]
export default data.map((item,index)=>({
    ...item,
   // key: faker.datatype.uuid(),
    color: colors[index%colors.length],
    image: images[item.key],
    // name: faker.name.findName(),
    // total: faker.datatype.number(),
    //jobTitle: faker.name.jobTitle(),
    // categories: [...Array(3).keys()].map(()=>{
    //     return {
    //         key: faker.datatype.uuid(),
    //         title: faker.name.jobType(),
    //         subcats: [...Array(3).keys()].map(faker.name.jobType),
    //     };
    // }),
}));