let container = require('markdown-it-container')

let navIndex = require('./sidebar/index.json'), 
    navTemplates = require('./sidebar/templates.json'),
    navLocode = require('./sidebar/locode.json'),
    navAutoQuery = require('./sidebar/autoquery.json'),
    navAuth = require('./sidebar/auth.json'),
    navGrpc = require('./sidebar/grpc.json'),
    navRedis = require('./sidebar/redis.json'),
    navOrmLite = require('./sidebar/ormlite.json')

let copy = ({cls,box,icon,txt}) => ({ 
    render(tokens, idx) {
        const token = tokens[idx]
        if (token.nesting === 1) {
            return `<div class="${cls} flex cursor-pointer mb-3" onclick="copy(this)">
            <div class="flex-grow ${box||'bg-gray-700'}">
                <div class="pl-4 py-1 pb-1.5 align-middle ${txt||'text-lg text-white'}">`
        } else {
            return `</div>
            </div>
            <div class="flex">
                <div class="${icon} text-white p-1.5 pb-0">
                    <svg class="copied w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <svg class="nocopy w-6 h-6" title="copy" fill='none' stroke='white' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                        <path stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'></path>
                    </svg>
                </div>
            </div>
        </div>\n`
        }
    }
})

module.exports = {
    title: 'Documentation',
    description: 'ServiceStack Docs',
    themeConfig: {
        repo: 'ServiceStack/docs',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        //lastUpdated: false,
        nav: [
            { text: 'Project Templates', link: '/templates-overview', activeMatch: '^/(templates|dotnet-new)'},
            { text: 'Locode', link: '/locode/', activeMatch: '^/locode'},
            { text: 'AutoQuery', link: '/autoquery', activeMatch: '^/(autoquery|why-not-odata)'},
            { text: 'Security', link: '/auth', activeMatch: '(auth|sessions)' },
            { text: 'gRPC', link: '/grpc', activeMatch: '^/grpc'},
            { text: 'OrmLite', link: '/ormlite/', activeMatch: '^/ormlite'},
            { text: 'Redis', link: '/redis/', activeMatch: '^/redis/'}
        ],
        sidebar: {
            '/redis': navRedis,
            '/ormlite': navOrmLite,
            '/templates': navTemplates,
            '/dotnet-new': navTemplates,
            '/locode': navLocode,
            '/autoquery': navAutoQuery,
            '/why-not-odata': navAutoQuery,
            '/auth': navAuth,
            '/sessions': navAuth,
            '/jwt-authprovider': navAuth,
            '/api-key-authprovider': navAuth,
            '/grpc': navGrpc,
            '/': navIndex,
        }
    },
    head: [
        ['script', { src: '/custom.js' }],
    ],
    markdown: {
        config: md => {
            md.use(container, 'nuget', copy({cls:'nuget-copy cp', icon:'bg-sky-500'}))
            md.use(container, 'sh', copy({cls:'sh-copy cp', box:'bg-gray-800', icon:'bg-green-600', txt:'whitespace-pre text-base text-gray-100'}))
        }
    }
}
