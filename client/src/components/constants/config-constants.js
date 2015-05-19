/**
 * MD5 码生成器
 */

(function () {
    'use strict';

    angular.module('home').constant('Config', {
        Nations: [
            {id: 0, name: '汉族'},
            {id: 1, name: '苗族'},
            {id: 2, name: '蒙古族'},
            {id: 3, name: '回族'},
            {id: 4, name: '壮族'},
            {id: 5, name: '维吾尔族'},
            {id: 6, name: '藏族'},
            {id: 7, name: '彝族'},
            {id: 8, name: '布依族'},
            {id: 9, name: '朝鲜族'},
            {id: 10, name: '满族'},
            {id: 11, name: '侗族'},
            {id: 12, name: '瑶族'},
            {id: 13, name: '白族'},
            {id: 14, name: '土家族'},
            {id: 15, name: '哈尼族'},
            {id: 16, name: '哈萨克族'},
            {id: 17, name: '傣族'},
            {id: 18, name: '黎族'},
            {id: 19, name: '僳僳族'},
            {id: 20, name: '佤族'},
            {id: 21, name: '畲族'},
            {id: 22, name: '拉祜族'},
            {id: 23, name: '水族'},
            {id: 24, name: '东乡族'},
            {id: 25, name: '纳西族'},
            {id: 26, name: '景颇族'},
            {id: 27, name: '柯尔克孜族'},
            {id: 28, name: '土族'},
            {id: 29, name: '达斡尔族'},
            {id: 30, name: '仫佬族'},
            {id: 31, name: '仡佬族'},
            {id: 32, name: '羌族'},
            {id: 33, name: '锡伯族'},
            {id: 34, name: '布朗族'},
            {id: 35, name: '撒拉族'},
            {id: 36, name: '毛南族'},
            {id: 37, name: '阿昌族'},
            {id: 38, name: '普米族'},
            {id: 39, name: '塔吉克族'},
            {id: 40, name: '怒族'},
            {id: 41, name: '乌孜别克族'},
            {id: 42, name: '俄罗斯族'},
            {id: 43, name: '鄂温克族'},
            {id: 44, name: '德昂族'},
            {id: 45, name: '保安族'},
            {id: 46, name: '裕固族'},
            {id: 47, name: '京族'},
            {id: 48, name: '基诺族'},
            {id: 49, name: '高山族'},
            {id: 50, name: '塔塔尔族'},
            {id: 51, name: '独龙族'},
            {id: 52, name: '鄂伦春族'},
            {id: 53, name: '赫哲族'},
            {id: 54, name: '门巴族'},
            {id: 55, name: '珞巴族'}
        ],
        Politicals: [
            {id: 0, name: '群众'},
            {id: 1, name: '团员'},
            {id: 2, name: '党员'},
            {id: 3, name: '预备党员'},
            {id: 4, name: '民主党派'},
            {id: 5, name: '罪犯'}
        ],
        Sexes: [
            {id: 0, name: '男'},
            {id: 1, name: '女'}
        ],
        Statuses: [
            {id: 0, name: '在职'},
            {id: 1, name: '离职'},
            {id: 2, name: '待岗'},
            {id: 3, name: '停职'},
            {id: 4, name: '退休'}
        ],
        Events: {
            UserInitEvent: "userInit",
            MenuInit: 'menuInit',
            ModelInit: 'ModelInit'
        },
        DepartmentTypes: [
            {id: '0', name: '未选择', infoUrl: 'components/template/department.no.info.tmp.html'},
            {
                id: '1',
                name: '学校',
                infoUrl: 'components/template/school.info.tmp.html',
                addUrl: 'components/template/school.add.tmp.html',
                editUrl: 'components/template/school.edit.tmp.html'
            },
            {
                id: '2',
                name: '院系',
                infoUrl: 'components/template/institute.info.tmp.html',
                addUrl: 'components/template/institute.add.tmp.html',
                editUrl: 'components/template/institute.edit.tmp.html'
            },
            {
                id: '3',
                name: '专业',
                infoUrl: 'components/template/professional.info.tmp.html',
                addUrl: 'components/template/professional.add.tmp.html',
                editUrl: 'components/template/professional.edit.tmp.html'
            },
            {
                id: '4',
                name: '班级',
                infoUrl: 'components/template/classes.info.tmp.html',
                addUrl: 'components/template/classes.add.tmp.html',
                editUrl: 'components/template/classes.edit.tmp.html'
            }
        ],
        toolbars: [
            ['h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'p',
                'pre',
                'quote',
                'bold',
                'italics',
                'underline',
                'strikeThrough',
                'ul',
                'ol',
                'undo',
                'redo',
                'clear',
                'justifyLeft',
                'justifyCenter',
                'justifyRight',
                'indent',
                'outdent',
                'html',
                'insertImage',
                'insertLink',
                'insertVideo']
        ],
        dateOptions: [
            {
                // Strings and translations
                monthsFull: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                weekdaysFull: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                weekdaysShort: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                showMonthsShort: undefined,
                showWeekdaysFull: undefined,

                // Buttons
                today: '今天',
                clear: '清除',
                close: '关闭',

                // Accessibility labels
                labelMonthNext: '下个月',
                labelMonthPrev: '上个月',
                labelMonthSelect: '选择月份',
                labelYearSelect: '选择年份',

                // Formats
                format: 'yyyy年mm月dd日',
                formatSubmit: undefined,
                hiddenPrefix: undefined,
                hiddenSuffix: '_submit',
                hiddenName: undefined,

                // Editable input
                editable: undefined,

                // Dropdown selectors
                selectYears: undefined,
                selectMonths: undefined,

                // First day of the week
                firstDay: undefined,

                // Date limits
                min: undefined,
                max: undefined,

                // Disable dates
                disable: undefined,

                // Root picker container
                container: undefined,

                // Hidden input container
                containerHidden: undefined,

                // Close on a user action
                closeOnSelect: true,
                closeOnClear: true,

                // Events
                onStart: undefined,
                onRender: undefined,
                onOpen: undefined,
                onClose: undefined,
                onSet: undefined,
                onStop: undefined
            }
        ],
        RestOptions: {
            'get': {name: '获取', dlg: '正在加载数据,请稍候...'},
            'getList': {name: '获取', dlg: '正在加载数据,请稍候...'},
            'post': {name: '增加', dlg: '正在提交数据,请稍候...'},
            'put': {name: '更新', dlg: '正在更新数据,请稍候...'},
            'delete': {name: '删除', dlg: '正在删除数据,请稍候...'},
            'remove': {name: '删除', dlg: '正在删除数据,请稍候...'},
            'head': {name: '头部', dlg: '正在加载数据,请稍候...'},
            'options': {name: '选项', dlg: '正在加载数据,请稍候...'},
            'patch': {name: 'patch', dlg: '正在加载数据,请稍候...'},
            'trace': {name: '打印', dlg: '正在加载数据,请稍候...'}
        },
        NewsTypes: [
            {id: 1, name: '工程'},
            {id: 2, name: '企业文化'},
            {id: 3, name: '行业新闻'},
            {id: 4, name: '外部'},
            {id: 5, name: '综合新闻'}
        ],
        NoticeTypes: [
            {id: 1, name: '事务公告'},
            {id: 2, name: '招募公告'},
            {id: 3, name: '变更公告'},
            {id: 4, name: '启事公告'},
            {id: 5, name: '其他公告'}
        ],
        Urls: {
            fileUrl: 'http://192.168.0.240:9050/file/direct/origin/',
            RestUrl: 'http://192.168.0.15:8080/'
//            RestUrl: undefined
        },
        Names: {
            repository: 'repository',      //仓库
            deployments: 'deployments',    //部署
            resources: 'resources',        //资源
            resourcedata: 'resourcedata',  //资源内容
            processDef: 'process-definitions',
            model: 'model',
            identitylinks: 'identitylinks',
            models: 'models',
            source: 'source',
            sourceExtra: 'source-extra',

            runtime: 'runtime',
            processInstances: 'process-instances',
            diagram: 'diagram',
            users: 'users',
            variables: 'variables',
            executions: 'executions',
            activities: 'activities',
            scope: 'scope',
            tasks: 'tasks',
            cascadeHistory: 'cascadeHistory',
            deleteReason: 'deleteReason',
            comments: 'comments',
            events: 'events',
            attachments: 'attachments',
            content: 'content',
            signals: 'signals',

            history: 'history',
            historicProcessInstances: 'historic-process-instances',
            data: 'data',
            historicDetail: 'historic-detail',

            form: 'form',
            formData: 'form-data',

            management: 'management',
            tables: 'tables',
            properties: 'properties',
            engine: 'engine',
            jobs: 'jobs',
            exceptionStacktrace: 'exception-stacktrace',

            identity: 'identity',
            picture: 'picture',
            info: 'info',
            groups: 'groups',
            members: 'members'
        },
        CookieNames: {
            userId: 'userClientId',
            token: 'auth_tokenClient'
        }

    });
})();
