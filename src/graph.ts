// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference path="./algorithm.ts"/>

class Graph {
    // public readonly edges: [number, number][]
    public readonly adj: number[][]

    // #region check about graph
    // boolean function only

    /** @timeComplexity O(N^2) */
    private static isUndirected(graph: Graph) {
        return true
    }

    /**
     * @assert this.isUndirected()
     * @timeComplexity O(N^2)
     */
    private static isConnected(graph: Graph) {
        return true
    }

    /**
     * @assert this.isConnected()
     * @timeComplexity O(?)
     */
    private static isCactus(graph: Graph) {
        return true
    }

    /** @timeComplexity O(?) */
    public isValid() {
        return Graph.isUndirected(this) && Graph.isConnected(this) && Graph.isCactus(this)
    }
    // #endregion

    // #region modify

    /**
     * @timeComplexity O(1)
     * @returns vertex index
     */
    public addVertex() {
        this.adj.push([])
        return this.adj.length - 1
    }

    /** @timeComplexity O(E) */
    public removeVertex(v: number) {
        const adj = this.adj
        if (v >= this.numOfVertices) {
            throw new Error('Invalid vertex')
        }

        while (adj.length > 0) this.disconnect(v, adj[v][0])
        adj.splice(v, 1)

        for (const connected of adj) {
            for (let i = 0; i < connected.length; i++) {
                if (connected[i] > v) connected[i]--
            }
        }
    }

    /** @timeComplexity O(1) */
    public connect(v1: number, v2: number) {
        const adj = this.adj
        if (v1 >= this.numOfVertices || v2 >= this.numOfVertices) {
            throw new Error('Invalid vertices')
        }
        if (adj[v1].includes(v2) || adj[v2].includes(v1)) {
            throw new Error('Already connected')
        }
        if (v1 === v2) {
            throw new Error('You must connect two different vertices')
        }

        adj[v1].push(v2)
        adj[v2].push(v1)
    }

    /** @timeComplexity O(E) */
    public disconnect(v1: number, v2: number) {
        const adj = this.adj
        if (v1 >= this.numOfVertices || v2 >= this.numOfVertices) {
            throw new Error('Invalid vertices')
        }
        if (!adj[v1].includes(v2) || !adj[v2].includes(v1)) {
            throw new Error('Already disconnected')
        }
        if (v1 === v2) {
            throw new Error('You must disconnect two different vertices')
        }

        adj[v1].splice(adj[v1].indexOf(v2), 1)
        adj[v2].splice(adj[v2].indexOf(v1), 1)
    }
    // #endregion

    /** The number of vertices */
    public get numOfVertices() {
        return this.adj.length
    }

    /** @timeComplexity O(1) */
    public degree(v: number) {
        if (v >= this.numOfVertices) throw new Error('Invalid vertex')
        return this.adj[v].length
    }

    /** @timeComplexity O(1) */
    public isJoint(v: number) {
        return this.degree(v) > 2
    }

    /** @timeComplexity O(1) */
    public isLeaf(v: number) {
        return this.degree(v) === 1
    }

    /** @timeComplexity O(1) */
    public copy() {
        return new Graph(this.adj)
    }

    /**
     * @assert this.isValid()
     * @timeComplexity O(1)
     */
    public constructor(adj: number[][] = []) {
        this.adj = adj
    }
}

export { Graph }