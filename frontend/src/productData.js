  //deifine state to hold the array of products
  const [ product, setProduct ] = useState([
    { id: 1, name:"Hunters Choice", price:"ksh1300", quantity:"750ml", abv:"ABV: 35%",url:"https://jayswines.com/wp-content/uploads/2015/04/Hunters-Choice-Whisky-750ml.png" },
    { id: 2,name:"Best", price:"ksh850", quantity:"750ml", abv:"ABV: 40%", url:"https://cdnprod.mafretailproxy.com/sys-master-root/h5e/hd3/26760669069342/22536_main.jpg_480Wx480H"},
    { id: 3, name:"MacMohan", price:"ksh850", quantity:"750ml", abv:"ABV: 40%", url:"https://cdnprod.mafretailproxy.com/sys-master-root/hfe/ha7/26799511240734/40577_main.jpg_480Wx480H" },
    { id: 4, name:"Jameson", price:"ksh2300", quantity:"750ml", abv:"ABV: 35%" ,url:"https://www.liquor.com/thmb/7ma31CQ_ueXBQ3VJh_khik6Q_lM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__liquor__2018__06__13150155__jameson-bottle-800x800-aa9bee41339d4cbe9f1d709c002f0ac2.jpg" },
    { id: 5, name:"Red label", price:"ksh1900", quantity:"750ml", abv:"ABV: 40%",url:"https://cdnprod.mafretailproxy.com/sys-master-root/hc2/hc4/17328605855774/41911_main.jpg_480Wx480H" },
    { id: 6,name:"Black label", price:"ksh3500", quantity:"750ml", abv:"ABV: 38%" ,url:"https://cdnprod.mafretailproxy.com/sys-master-root/h07/hdd/17328600612894/41904_main.jpg_480Wx480H" },
    { id: 7, name:"Jack daniels", price:"ksh2400", quantity:"750ml", abv:"ABV: 40%" ,url:"https://jayswines.com/wp-content/uploads/2015/04/buy-JACK-DANIEL-online-in-nairobi-kenya-tennessee-sour-mash-whiskey.jpg" },
    { id: 8, name:"Black and White", price:"ksh1100", quantity:"750ml", abv:"ABV: 40%" ,url:"https://cdnprod.mafretailproxy.com/sys-master-root/hbb/hb0/16872229961758/82187_main.jpg_480Wx480H" },
])