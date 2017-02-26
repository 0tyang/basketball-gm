import type {GetOutput} from '../../util/types';

async function updateToken(
    inputs: GetOutput,
): void | {[key: string]: any} {
    return {
        token: inputs.token,
    };
}

export default {
    inLeague: false,
    runBefore: [updateToken],
};
