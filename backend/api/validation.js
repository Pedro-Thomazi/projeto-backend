module.exports = app => {
    function existsOrError(value, msg) {   // Se existe: ok, se não existir: Erro
        if (!value) throw msg
        if (Array.isArray(value) && value.length === 0) throw msg
        if (typeof value === 'string' && !value.trim()) throw msg  // string com espaços
    }

    const notExiststOrError = (value, msg) => {  // Se não existe: ok, se existir: Erro
        try {
            existsOrError(value, msg)
        }
        catch (msg) {
            return
        }
        throw msg
    }

    const equalsOrError = (valueA, valueB, msg) => {
        if (valueA !== valueB) throw msg
    }

    return { existsOrError, notExiststOrError, equalsOrError }
}