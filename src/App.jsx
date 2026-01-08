import React, { useEffect, useState } from 'react'

const App = () => {

  const [food,setFood] = useState('')
  const [shoppingList,setShoppingList] = useState([]); 
  const [bucketList,setBucketList] = useState([]);

  const handleInput = (e)=>{
    console.log(e.target.value);
    setFood(e.target.value);
  }
    
    const fetchItems = async (food)=>{
      const url = `https://api.frontendeval.com/fake/food/${food}`;
      const result = await fetch (url);
      const data =  await result.json()
      setShoppingList(data);
   }
    //  console.log(shoppingList)



  useEffect(()=>{
  if(food.length >=2){
    //make an API call
    fetchItems(food);
  }
  },[food])

  const handleShoppingList = (e)=>{
  const idx = e.target.getAttribute('data-id');
  if(idx){
   const obj = {
    id:Date.now(),
    data: shoppingList[idx],
    isDone: false

   }
   const copyBucketList = [...bucketList];
   copyBucketList.push(obj);
   setBucketList(copyBucketList); 
  }
  setFood('')
  }
  console.log(bucketList)

  const handleRightClick =(id) => {
    const copyBucketList = [...bucketList];
    const newBucketList = copyBucketList.map((item)=>{
      if(item.id == id){
        item.isDone = !item.isDone;
      }
      return item;
    })
    setBucketList(newBucketList);
  }

  const handleDelete = (id) =>{
    const copyBucketList = [...bucketList];
    const newList = copyBucketList.filter((item) => item.id !=id)
    setBucketList(newList);

  }
  return (
    <div className='App flex flex-col items-center justify-center p-8'>
      <h1 className='text-4xl font-bold'>My Shopping List</h1>

      
      {/* input button */}
      <div className=''>
        <input value={food} onChange={handleInput} className='w-[230px] h-[40px] outline-none p-3 font-medium   border-1 mt-8' type="text" />
      </div>

   {

    // auto suggestion
    food.length>=2 ? <div onClick={handleShoppingList} className="shopping-list w-[230px] m-5 text-center h-[150px] overflow-y-auto bg-gray-300">
          {
            shoppingList.map((item,index)=>{
              return <div 
              data-id={index}
              className='product text-left m-[8px] text-[18px] p-[4px] cursor-pointer hover:bg-teal-300'>
                {item}
              </div>
            })
          }
      </div> : null
   }



      {/*bucket list  */}
      <div className="bucket w-[300px] m-2">
        {
          bucketList.map((item)=>{
            return <div className='shopping-item  flex justify-between items-center h-[34px] bg-blue-300 mt-4 text-center text-[22px]  font-semibold rounded-[12px] p-6'>
              <button
              onClick={()=>handleRightClick(item.id)}
              className='bg-blue-300 font-bold cursor-pointer hover:bg-white rounded-[50%] w-[40px] h-[40px]'>✓</button>
              <div className={`${item.isDone ? "strike" : ""} text-white`}>
              {item.data}</div>
              <button 
              onClick={()=>handleDelete(item.id)}
              className='bg-blue-300 font-bold cursor-pointer hover:bg-white rounded-[50%] w-[40px] h-[40px]'>X</button>
            </div>
          })
        }

      </div>
    </div>
  )
}

export default App