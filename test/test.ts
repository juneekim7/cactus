import fs from 'fs'
import { resolve } from 'path'
import { Graph } from '../src/graph'
import { getEccSeq } from '../src/algorithm'

const numOfData = 2
for (let i = 0; i < numOfData; i++) {
    const adj = JSON.parse(fs.readFileSync(
        // eslint-disable-next-line no-undef
        resolve(__dirname, `./input/${i}.json`),
        'utf-8'
    ))
    console.log(adj)
    const graph = new Graph(adj)
    fs.writeFileSync(
        // eslint-disable-next-line no-undef
        resolve(__dirname, `./output/${i}.json`),
        JSON.stringify(getEccSeq(graph), null, 4)
    )
}