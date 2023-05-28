// every function must be pure function
import type { Graph } from './graph'

class Ball {
    public readonly type: 'linear' | 'cycle'
    public readonly vertices: number[]
    public readonly joints: number[]

    /** @timeComplexity O(1) */
    public get maxEcc() {
        if (this.type === 'linear') return this.vertices.length - 1
        if (this.type === 'cycle') return Math.floor(this.vertices.length / 2)
    }

    public constructor(type: 'linear' | 'cycle', vertices: number[] = [], joints: number[] = []) {
        this.type = type
        this.vertices = vertices
        this.joints = joints
    }
}

/**
 * @assert graph.isValid()
 * @timeComplexity O(V + E)
 */
function divideBall(graph: Graph, v: number, balls: Ball[], ballAdj: number[][], lastV = -1,
    hasVisited = new Array(graph.numOfVertices).fill(false), hasFinished = new Array(graph.numOfVertices).fill(false)): Ball | null {

    console.log('start: ' + v)
    hasVisited[v] = true
    let ball: Ball | null = null

    if (graph.isLeaf(v)) {
        return new Ball('linear', [v])
    }

    for (const next of graph.adj[v]) {
        if (next === lastV || hasFinished[next]) continue
        if (hasVisited[next]) {
            ball = new Ball('cycle', [next, v], [next])
            if (graph.isJoint(v)) {
                ball.joints.push(v)
            }
            continue
        }

        const check: Ball | null = divideBall(graph, next, balls, ballAdj, v, hasVisited, hasFinished)
        if (!check) continue
        if (check.type === 'cycle' && check.vertices[0] === v) {
            for (const joint of check.joints) {
                ballAdj[joint].push(balls.length)
            }
            console.log(check)
            balls.push(check)
            ball = new Ball('linear', [v], [v])
        }
        else if (check.type === 'cycle') {
            ball = check
            ball.vertices.push(v)
            if (graph.isJoint(v)) {
                ball.joints.push(v)
            }
        }
        else if (check.type === 'linear' && graph.isJoint(v)) {
            check.vertices.push(v)
            check.joints.push(v)
            for (const joint of check.joints) {
                ballAdj[joint].push(balls.length)
            }
            console.log(check)
            balls.push(check)
        }
        else if (check.type === 'linear') {
            ball = check
            ball.vertices.push(v)
        }
    }

    if (graph.isJoint(v) && ball === null) {
        ball = new Ball('linear', [v], [v])
    }

    hasFinished[v] = true
    console.log('finish: ' + v)
    return ball
}

/**
 * @assert graph.isValid()
 * @timeComplexity O(V + E)
 */
function getEccSeq(graph: Graph) {
    const balls: Ball[] = []
    const ballAdj: number[][] = new Array(graph.numOfVertices).fill(null).map(() => [])

    for (let v = 0; v < graph.numOfVertices; v++) {
        if (graph.isJoint(v)) {
            divideBall(graph, v, balls, ballAdj)
            break
        }
    }

    return {
        balls,
        ballAdj
    }
}

export { getEccSeq }