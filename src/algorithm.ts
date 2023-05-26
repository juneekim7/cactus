// every function must be pure function

function isConnected() {
    return true
}

function isCactus() {
    return true
}

function isCycle() {

}

function getEccSeq() {
    if (!isConnected()) throw new Error('The graph must be connected')
    if (!isCactus()) throw new Error('The graph must be a cactus graph!')

    return null
}

export { getEccSeq }