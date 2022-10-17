import { MyPluginBase } from "../my_plugin_base";

var underscore = require('underscore');


import { cache } from "../cache";
import { helper } from "../helper";
// import { log } from "../log";
import { session } from "../session";

// const plugin = new Plugin(50, 'cache', '', 'Plugin to provide local cache.');

class CachePlugin extends MyPluginBase {
    id = 50
    name = 'cache'
    builtin = true;
    constructor() {
        super()
    }

    clearCacheIfTchanged(needTranslation) {
        const translationConfig = cache.get(helper.KEYS.translation);
        if (!translationConfig || translationConfig['useEndpointTranslation'] != needTranslation) {
            cache.deleteAll();
            cache.set(helper.KEYS.translation, { useEndpointTranslation: needTranslation });

        }
    }

    public getProblems(needTranslation, cb) {
        this.clearCacheIfTchanged(needTranslation);
        const problems = cache.get(helper.KEYS.problems);
        if (problems) {

            return cb(null, problems);
        }
        this.next.getProblems(needTranslation, function (e, problems) {
            if (e) return cb(e);
            cache.set(helper.KEYS.problems, problems);
            return cb(null, problems);
        });
    };

    public getProblem(problem, needTranslation, cb) {
        this.clearCacheIfTchanged(needTranslation);
        const k = helper.KEYS.problem(problem);
        const _problem = cache.get(k);
        var that = this;
        if (_problem) {
            if (!_problem.desc.includes('<pre>')) {

            } else if (!['likes', 'dislikes'].every(p => p in _problem)) {

            } else {

                underscore.extendOwn(problem, _problem);
                return cb(null, problem);
            }
        }
        this.next.getProblem(problem, needTranslation, function (e, _problem) {
            if (e) return cb(e);

            that.saveProblem(_problem);
            return cb(null, _problem);
        });
    };

    saveProblem(problem) {
        // it would be better to leave specific problem cache being user
        // independent, thus try to reuse existing cache as much as possible
        // after changing user.
        const _problem = underscore.omit(problem, ['locked', 'state', 'starred']);
        return cache.set(helper.KEYS.problem(problem), _problem);
    };

    updateProblem(problem, kv) {
        const problems = cache.get(helper.KEYS.problems);
        if (!problems) return false;

        const _problem = problems.find(x => x.id === problem.id);
        if (!_problem) return false;

        underscore.extend(_problem, kv);
        return cache.set(helper.KEYS.problems, problems);
    };

    login(user, cb) {
        this.logout(user, false);
        this.next.login(user, function (e, user) {
            if (e) return cb(e);
            session.saveUser(user);
            return cb(null, user);
        });
    };

    logout = function (user, purge) {
        if (!user) user = session.getUser();
        if (purge) session.deleteUser();
        // NOTE: need invalidate any user related cache
        session.deleteCodingSession();
        return user;
    };
}


export const pluginObj: CachePlugin = new CachePlugin();
