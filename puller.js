global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const Octokit = require('@octokit/rest');

exports.puller = async () => {
    const openMergeRequest = () => {
        const octokit = new Octokit({
            auth: `token ${process.env.GITHUB_TOKEN}`
        });
        return octokit.pulls.create({
            owner: process.env.baseRepoOwner,
            repo: process.env.repoName,
            head: `${process.env.headRepoOwner}:${process.env.headRepoBranch}`,
            base: process.env.baseRepoBranch,
            title: 'Automatic syncing pull request',
            body: `Automatic syncing pull request for ${new Date()}`,
            maintainer_can_modify: false
        });
    };

    const handleError = error => {
        if (error.name === "HttpError" &&
            error.status === 422 &&
            error.errors) {
            let message = error.errors[0].message;
            if (message.includes('No commits between'))
                return {
                    status: 'Success',
                    message: 'No commits found'
                };
            else if (message.includes('A pull request already exists'))
                return {
                    status: 'Success',
                    message: 'A pull request already exists'
                };
            else
                return error;
        } else
            return error;
    };

    return openMergeRequest()
        .then(() => {
            const message = {
                status: 'Success',
                message: 'Pull request created'
            };
            console.log(message);
            return message;
        })
        .catch(error => {
            const message = handleError(error);
            console.log(message);
            return message;
        });
};
