// Test import of styles
import '@/styles/index.scss'
//import sleep function from sleepjs
import { sleep, sleepMilliseconds } from 'sleepjs'

// Grab the html canvases and set the background to light grey
const canvas1 = document.getElementById('canvas1')
const ctx = canvas1.getContext('2d')
// Set the background to dark grey
ctx.fillStyle = '#333'
ctx.fillRect(0, 0, canvas1.width, canvas1.height)
// Grab the second canvas and set the background to light grey
const canvas2 = document.getElementById('canvas2')
const ctx2 = canvas2.getContext('2d')
ctx2.fillStyle = '#333'
ctx2.fillRect(0, 0, canvas2.width, canvas2.height)
// Grab the third canvas and set the background to light grey
const canvas3 = document.getElementById('canvas3')
const ctx3 = canvas3.getContext('2d')
ctx3.fillStyle = '#333'
ctx3.fillRect(0, 0, canvas3.width, canvas3.height)
// Grab the fourth canvas and set the background to light grey
const canvas4 = document.getElementById('canvas4')
const ctx4 = canvas4.getContext('2d')
ctx4.fillStyle = '#333'
ctx4.fillRect(0, 0, canvas4.width, canvas4.height)

const edgeMargin = 30

//set all canvas widths to the half of the window width subtracting the margins
canvas1.width = window.innerWidth / 2 - edgeMargin
canvas2.width = window.innerWidth / 2 - edgeMargin
canvas3.width = window.innerWidth / 2 - edgeMargin
canvas4.width = window.innerWidth / 2 - edgeMargin

//set all canvas heights to the half of the window height subtracting the margins
canvas1.height = window.innerHeight / 2 - 20
canvas2.height = window.innerHeight / 2 - 20
canvas3.height = window.innerHeight / 2 - 20
canvas4.height = window.innerHeight / 2 - 20

//create a constant for how many blocks to generate
const numblocks = 100

//create an array called blocks
var blocks1 = []
var blocks2 = []
var blocks3 = []
var blocks4 = []

//create a class called block which contains the following properties
//x, y, width, height
class Block {
  constructor(width, height) {
    this.width = width
    this.height = height
  }
}

//create a function to draw the blocks array on the canvas takes in the canvas and the blocks array
function drawBlocks(canvas, ctx, blocks, activeElement = -1, knownSorted = -1) {
  //loop through the blocks array
  //clear the canvas and set the background to dark grey
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#333'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < blocks.length; i++) {
    //set the fill style to white
    ctx.fillStyle = 'white'
    //draw a rectangle with the x, y, width, and length of the block at the bottom of the canvas
    if (i != activeElement || activeElement == -1) {
      ctx.fillRect(
        (canvas.width / blocks.length) * i,
        canvas.height - blocks[i].height,
        blocks[i].width,
        blocks[i].height
      )
    } 
    //if the known sorted inex is equal to the current index color the block green
    if (knownSorted == i) {
      ctx.fillStyle = 'green'
      ctx.fillRect(
        (canvas.width / blocks.length) * i,
        canvas.height - blocks[i].height,
        blocks[i].width,
        blocks[i].height
      )
    }
    if (activeElement == i) {
      ctx.fillStyle = 'red'
      ctx.fillRect(
        (canvas.width / blocks.length) * i,
        canvas.height - blocks[i].height,
        blocks[i].width,
        blocks[i].height
      )
    }
  }
}

//create a function to generate the blocks array
function generateBlocks(blocks, numblocks = 10, canvas) {
  //create a for loop that runs for the number of blocks
  for (let i = 0; i < numblocks; i++) {
    //create a new block with the base at the bottom of the canvas and the the length decreasing in equal increments starting from the top of the canvas and the y coordinate increasing in equal increments to make the blocks even on the bottom of the canvas
    blocks.push(new Block(canvas.width / numblocks, ((i + 1) * canvas.height) / numblocks))
  }
}

//create a bubble sort function that takes in the blocks array
async function bubbleSort(blocks) {
  //create a for loop that runs for the length of the blocks array
  for (let i = 0; i < blocks.length; i++) {
    //create a for loop that runs for the length of the blocks array

    for (let j = 0; j < blocks.length; j++) {
      //if the block at the current index is greater than the block at the next index
      
      if (blocks[i].height < blocks[j].height) {
        //swap the blocks
        let temp = blocks[i]
        blocks[i] = blocks[j]
        blocks[j] = temp
        //draw the blocks
        drawBlocks(canvas1, ctx, blocks1, j, i)
        //play frequency sound at the frequency of the block that is being swapped which is the height of the block
        await sleep(1)
      }
    }
  }
  drawBlocks(canvas1, ctx, blocks, -1)
}

//create a selection sort function that takes in the blocks array
async function selectionSort(blocks) {
  //create a for loop that runs for the length of the blocks array
  for (let i = 0; i < blocks.length; i++) {
    //create a variable called minIndex and set it to the current index
    let minIndex = i
    //create a for loop that runs for the length of the blocks array
    for (let j = i; j < blocks.length; j++) {
      //if the block at the current index is greater than the block at the next index
      if (blocks[j].height < blocks[minIndex].height) {
        //set the minIndex to the next index
        minIndex = j
        //draw the blocks with the active element being the current index and the known sorted being the minIndex
        drawBlocks(canvas2, ctx2, blocks2, minIndex, i)
        await sleep(1)
      }
    }
    //swap the blocks
    let temp = blocks[i]
    blocks[i] = blocks[minIndex]
    blocks[minIndex] = temp
  }
  drawBlocks(canvas2, ctx2, blocks, -1)
}

//create a insertion sort function that takes in the blocks array
async function insertionSort(blocks) {
  //create a for loop that runs for the length of the blocks array
  for (let i = 1; i < blocks.length; i++) {
    //create a variable called j and set it to the current index
    let j = i
    //create a while loop that runs while the j index is greater than 0
    while (j > 0 && blocks[j].height < blocks[j - 1].height) {
      //swap the blocks
      let temp = blocks[j]
      blocks[j] = blocks[j - 1]
      blocks[j - 1] = temp
      //draw the blocks with the active element being the one that is being swapped
      drawBlocks(canvas3, ctx3, blocks, j - 1, i)
      await sleep(1)
      //decrement the j index
      j--
    }
  }
  drawBlocks(canvas3, ctx3, blocks, -1)
}

//create a helper function called merge that takes in the blocks array and the left and right indices
function merge(blocks, left, mid, right) {
  
  //create two temporary arrays
  let leftarr =  []
  let rightarr = []

  //copy data to temp arrays
  for (let i = left; i <= right; i++) {
    leftarr[i - left] = blocks[i]
  }
  for (let i = mid + 1; i <= right; i++) {
    rightarr[i - mid - 1] = blocks[i]
  }

  let indexofleft = 0
  let indexofright = 0

  let indexofmerged = left

  //merge the temp arrays back into the blocks array
  while (indexofleft < leftarr.length && indexofright < rightarr.length) {
    if (leftarr[indexofleft].height < rightarr[indexofright].height) {
      blocks[indexofmerged] = leftarr[indexofleft]
      indexofleft++
    } else {
      blocks[indexofmerged] = rightarr[indexofright]
      indexofright++
    }
    indexofmerged++
  }
  //copy the rest of the left array into the blocks array if there is any left
  while (indexofleft < leftarr.length) {
    blocks[indexofmerged] = leftarr[indexofleft]
    indexofleft++
    indexofmerged++
  }
  //copy the rest of the right array into the blocks array if there is any left
  while (indexofright < rightarr.length) {
    blocks[indexofmerged] = rightarr[indexofright]
    indexofright++
    indexofmerged++
  }
}


//create a merge sort function that takes in the blocks array
async function mergeSort(blocks, left, right) {
  if (left < right) {
    let mid = Math.floor((left + right) / 2)
    //sort the left half of the array
    await mergeSort(blocks, left, mid)
    //sort the right half of the array
    await mergeSort(blocks, mid + 1, right)
    //merge the two halves
    merge(blocks, left, mid, right)
  } else {
    //draw the blocks
    drawBlocks(canvas4, ctx4, blocks, -1)
    return
  }
  
}



//generate the blocks array
generateBlocks(blocks1, numblocks, canvas1)
generateBlocks(blocks2, numblocks, canvas2)
generateBlocks(blocks3, numblocks, canvas3)
generateBlocks(blocks4, numblocks, canvas4)

resize()

//shuffle the blocks array then draw the blocks array
blocks1.sort(() => Math.random() - 0.5)
blocks2.sort(() => Math.random() - 0.5)
blocks3.sort(() => Math.random() - 0.5)
blocks4.sort(() => Math.random() - 0.5)

drawBlocks(canvas1, ctx, blocks1)
drawBlocks(canvas2, ctx2, blocks2)
drawBlocks(canvas3, ctx3, blocks3)
drawBlocks(canvas4, ctx4, blocks4)



//if sort button is clicked run the bubble sort function
document.getElementById('sort').addEventListener('click', () => {
  //if the sort button text is 'sort'
  if (document.getElementById('sort').innerText === 'Sort') {
    //shuffle the blocks array
    //run bubble sort function
    bubbleSort(blocks1)
    //draw the blocks array on the canvas
    drawBlocks(canvas1, ctx, blocks1)
    //if the sort button is clicked again shuffle the blocks array and redraw the blocks array
    //change sort button text to 'reshuffle'
    document.getElementById('sort').innerText = 'Reshuffle'
  } else {
    blocks1.sort(() => Math.random() - 0.5)
    drawBlocks(canvas1, ctx, blocks1)
    //change the sort button text to 'sort'
    document.getElementById('sort').innerText = 'Sort'
  }
})

//if the selection sort button is clicked run the selection sort function
document.getElementById('sort2').addEventListener('click', () => {
  //if the sort button text is 'sort'
  if (document.getElementById('sort2').innerText === 'Sort') {
    //shuffle the blocks array
    //run selection sort function
    selectionSort(blocks2)
    console.log(blocks2)
    //draw the blocks array on the canvas
    drawBlocks(canvas2, ctx2, blocks2)
    //if the sort button is clicked again shuffle the blocks array and redraw the blocks array
    //change sort button text to 'reshuffle'
    document.getElementById('sort2').innerText = 'Reshuffle'
  } else {
    blocks2.sort(() => Math.random() - 0.5)
    drawBlocks(canvas2, ctx2, blocks2)
    //change the sort button text to 'sort'
    document.getElementById('sort2').innerText = 'Sort'
  }
})

//if the insertion sort button is clicked run the insertion sort function
document.getElementById('sort3').addEventListener('click', () => {
  //if the sort button text is 'sort'
  if (document.getElementById('sort3').innerText === 'Sort') {
    //shuffle the blocks array
    //run insertion sort function
    insertionSort(blocks3)
    //draw the blocks array on the canvas
    drawBlocks(canvas3, ctx3, blocks3)
    //if the sort button is clicked again shuffle the blocks array and redraw the blocks array
    //change sort button text to 'reshuffle'
    document.getElementById('sort3').innerText = 'Reshuffle'
  } else {
    blocks3.sort(() => Math.random() - 0.5)
    drawBlocks(canvas3, ctx3, blocks3)
    //change the sort button text to 'sort'
    document.getElementById('sort3').innerText = 'Sort'
  }
})

//if the quick sort button is clicked run the quick sort function
document.getElementById('sort4').addEventListener('click', () => {
  //if the sort button text is 'sort'
  if (document.getElementById('sort4').innerText === 'Sort') {
    //shuffle the blocks array
    //run merge sort function
    mergeSort(blocks4, 0, blocks4.length - 1)
    //draw the blocks array on the canvas
    drawBlocks(canvas4, ctx4, blocks4)
    //if the sort button is clicked again shuffle the blocks array and redraw the blocks array
    //change sort button text to 'reshuffle'
    document.getElementById('sort4').innerText = 'Reshuffle'
  } else {
    blocks4.sort(() => Math.random() - 0.5)
    drawBlocks(canvas4, ctx4, blocks4)
    //change the sort button text to 'sort'
    document.getElementById('sort4').innerText = 'Sort'
  }
})

//function update block size
function updateBlockSize(blocks, canvas) {
  //loop through the blocks array and set the block width to the canvas width divided by the number of blocks
  //create a variable to store max height of the blocks
    let maxHeight = 0
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].width = canvas.width / blocks.length
        if (blocks[i].height > maxHeight) {
            maxHeight = blocks[i].height
        }
    }
    //loop through the blocks array and scale the block height to make the max height of the blocks equal to the canvas height
    var scale = canvas.height / maxHeight
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].height = blocks[i].height * scale
    }

}

//on window resize run the resize function
window.addEventListener('resize', resize)
//resize function
function resize() {
  //set all canvas widths to the half of the window width subtracting the margins
  //if the user is not on a mobile device
  if (window.innerWidth > 600) {
    canvas1.width = window.innerWidth / 2 - edgeMargin
    canvas2.width = window.innerWidth / 2 - edgeMargin
    canvas3.width = window.innerWidth / 2 - edgeMargin
    canvas4.width = window.innerWidth / 2 - edgeMargin
  }
  //if the user is on a mobile device
  else {
    //set the canvas width to the window width subtracting the margins
    canvas1.width = window.innerWidth - edgeMargin
    canvas2.width = window.innerWidth - edgeMargin
    canvas3.width = window.innerWidth - edgeMargin
    canvas4.width = window.innerWidth - edgeMargin
  }

  //if user is on mobile device set the canvas width to the window width subtracting the margins
  if (window.innerWidth < 600) {
    canvas1.width = window.innerWidth - edgeMargin
    canvas2.width = window.innerWidth - edgeMargin
    canvas3.width = window.innerWidth - edgeMargin
    canvas4.width = window.innerWidth - edgeMargin
    //set canvas height to the window height subtracting the margins
    canvas1.height = (window.innerHeight * 2) / 5 - 20
    canvas2.height = (window.innerHeight * 2) / 5 - 20
    canvas3.height = (window.innerHeight * 2) / 5 - 20
    canvas4.height = (window.innerHeight * 2) / 5 - 20
  }
  //loop through the blocks array and set the block width to the canvas width divided by the number of blocks and set the block height to the canvas height divided by the number of blocks
  updateBlockSize(blocks1, canvas1)
  updateBlockSize(blocks2, canvas2)
  updateBlockSize(blocks3, canvas3)
  updateBlockSize(blocks4, canvas4)
  //redraw the blocks array
  drawBlocks(canvas1, ctx, blocks1)
  drawBlocks(canvas2, ctx2, blocks2)
  drawBlocks(canvas3, ctx3, blocks3)
  drawBlocks(canvas4, ctx4, blocks4)

  //loop through the blocks array and set the block width to the canvas width divided by the number of blocks and set the block height to the canvas height divided by the number of blocks
}
