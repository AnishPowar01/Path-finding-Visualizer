
function Astar(startNode, endNode)
{
    let openSet = [] // conatins the node we have tonvisite
    let closeSet = [] // node alredy visisted
    let path = [] // constriuct the shortest path

    let visitedNodes = [];

    openSet.push(startNode);

    while(openSet.length > 0)
    {
        let leastIndex = 0;
        for(let i = 0; i<openSet.length; i++)
        {
            if(openSet[i].f < openSet[leastIndex].f)
            {
                leastIndex = i;
            }
        }

        let current = openSet[leastIndex];
        visitedNodes.push(current);

        if(current === endNode)
        {
            let temp = current;
            path.push(temp);
            while(temp.previous)
            {
                path.push(temp.previous);
                temp = temp.previous;
            }
            // console.log(path);

            return {path,visitedNodes};
        }

        openSet = openSet.filter((elt) => elt !==current);
        closeSet.push(current);

        let neighbour = current.neighbour;
        for(let i = 0 ; i<neighbour.length; i++)
        {
            let neighbours = neighbour[i];
            if(!closeSet.includes(neighbours) && !neighbours.isWall)
            {
                let tempG = current.g +1;
                let newpath = false;
                if(openSet.includes(neighbours))
                {
                    if(tempG < neighbours.g)
                    {
                        neighbours.g = tempG;
                        newpath = true;
                    }
                }
                else
                {
                    neighbours.g = tempG;
                        newpath = true;
                        openSet.push(neighbours);
                }

                if(newpath)
                {
                    neighbours.h = heruistic(neighbours,endNode);
                    neighbours.f = neighbours.g + neighbours.f;
                    neighbours.previous = current;
                }
            }

        }

    }
    return {path, visitedNodes ,error:"No path Found!"};

}

function heruistic(a,b)
{
    let d = Math.abs(a.x - a.y) + Math.abs(b.x - b.y);
    return d;
}

export default Astar;