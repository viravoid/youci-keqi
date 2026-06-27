import { o as __toESM } from "../_runtime.mjs";
import { i as toggleSavedWord, r as replaceHistoryEntry, t as addHistoryEntry } from "./localHistory-zaoMvSap.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as motion, s as AnimatePresence } from "../_libs/framer-motion.mjs";
import { a as saveLastWord, n as SAMPLE, s as toWordResult, t as DepthBackground } from "./DepthBackground-Bw-ifiXn.mjs";
import { N as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as saveFeedback } from "./feedbackLog-PfPkfRra.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mockMatchWord-CBRv2VHJ.js
var vagueFeelingWords = [
	"焦虑",
	"内耗",
	"累",
	"难受",
	"不舒服",
	"没安全感",
	"压力",
	"迷茫",
	"空",
	"stressed",
	"anxious",
	"stuck",
	"tired",
	"overwhelmed"
];
var concreteSignalWords = [
	"因为",
	"当",
	"之后",
	"那一刻",
	"一句话",
	"行为",
	"身体",
	"心跳",
	"想靠近",
	"想远离",
	"想写",
	"突然",
	"反复",
	"结束后",
	"when",
	"because",
	"after",
	"said",
	"body",
	"suddenly"
];
var sceneOptions = {
	亲密关系: [
		{
			id: "relationship-trigger",
			label: "某句话或行为让熟悉感断开",
			detail: "关系中的触发点比较具体，像一句话、一个动作或态度变化。"
		},
		{
			id: "relationship-boundary",
			label: "亲近和想远离同时存在",
			detail: "这里同时有靠近、抵触和边界感。"
		},
		{
			id: "relationship-history",
			label: "过去的亲密仍在影响现在",
			detail: "这份感受和长时间相处、旧情分或回忆有关。"
		}
	],
	日常瞬间: [
		{
			id: "daily-object",
			label: "一个具体物件或场景触发了感受",
			detail: "光线、气味、地点或小事把这份感受带了出来。"
		},
		{
			id: "daily-body",
			label: "身体先反应，语言后来才跟上",
			detail: "你先感觉到心口、呼吸、发紧或放松，再想描述它。"
		},
		{
			id: "daily-contrast",
			label: "普通时刻突然变得有重量",
			detail: "日常本身没变，但你对它的感知突然改变。"
		}
	],
	书影音余韵: [
		{
			id: "art-afterglow",
			label: "作品结束后情绪还停留在身体里",
			detail: "电影、书、音乐或演出结束了，但余韵没有结束。"
		},
		{
			id: "art-lit-up",
			label: "被某种生命力或成长感点亮",
			detail: "你感到被鼓励、被照亮，想把这份能量写下来。"
		},
		{
			id: "art-wordless",
			label: "想分享却找不到精准表达",
			detail: "重点在于你被作品触动后的表达需求。"
		}
	],
	友情家庭: [
		{
			id: "family-tie",
			label: "牵连很深，但很难直接说出口",
			detail: "这份感受和情分、责任、照顾或未说出口的话有关。"
		},
		{
			id: "family-expectation",
			label: "期待和现实之间有落差",
			detail: "你期待被理解、被回应或被公平对待，但实际并不完全如此。"
		},
		{
			id: "family-memory",
			label: "旧记忆突然回到现在",
			detail: "某个旧场景或旧称呼让现在的关系变得复杂。"
		}
	],
	工作学业: [
		{
			id: "work-standard",
			label: "不知道什么程度才算够好",
			detail: "压力来自标准不清，而不是任务本身。"
		},
		{
			id: "work-resource",
			label: "责任在你，但资源不够",
			detail: "你需要承担结果，却缺少时间、信息、权限或支持。"
		},
		{
			id: "work-tradeoff",
			label: "两个目标之间还没做取舍",
			detail: "比如速度和质量、期待和现实、稳定和变化无法同时满足。"
		}
	],
	自我追问: [
		{
			id: "self-exposure",
			label: "离开熟悉身份后感到赤裸",
			detail: "你不再依附原来的群体、标签或关系，于是必须重新面对自己。"
		},
		{
			id: "self-meaning",
			label: "想确认自己为何这样生活",
			detail: "意义、方向或身份暂时没有落点。"
		},
		{
			id: "self-not-nihilism",
			label: "不是虚无，也不是想回到人群",
			detail: "你在区分几种相近但不一样的状态。"
		}
	]
};
function containsAny(text, words) {
	const normalized = text.toLocaleLowerCase();
	return words.some((word) => normalized.includes(word.toLocaleLowerCase()));
}
function hasConcreteSignal(text) {
	return containsAny(text, concreteSignalWords) || text.length >= 42;
}
function pickFuzzyPoints(text) {
	const hits = vagueFeelingWords.filter((word) => text.toLocaleLowerCase().includes(word.toLocaleLowerCase()));
	if (hits.length > 0) return hits.slice(0, 2).map((word) => `“${word}”还没有说明具体触发点`);
	if (text.trim().length < 30) return ["这段描述还比较短，可能缺少触发场景"];
	return [];
}
function auditExpressionInput(userText, scene) {
	const trimmed = userText.trim();
	const fuzzyPoints = pickFuzzyPoints(trimmed);
	const missingSignals = [];
	if (!hasConcreteSignal(trimmed)) missingSignals.push("缺少一次具体场景、原话、动作或身体反应");
	if (!containsAny(trimmed, [
		"想",
		"希望",
		"需要",
		"表达",
		"写",
		"share",
		"say"
	])) missingSignals.push("还不清楚你是想自我理解，还是想把它写给别人看");
	return {
		fuzzyPoints,
		missingSignals,
		shouldClarify: trimmed.length >= 12 && (fuzzyPoints.length > 0 || missingSignals.length > 0),
		options: [...sceneOptions[scene], {
			id: "none-of-above",
			label: "都不是",
			detail: "上面的判断没有覆盖你的意思，我会优先参考你补充的具体事实。"
		}],
		memoryPrompt: "回想一个最能代表这段感受的瞬间：当时发生了什么、谁说了什么、你的身体或行动有什么变化？"
	};
}
function buildSilentPrecisionContext(userText, scene) {
	const audit = auditExpressionInput(userText, scene);
	if (!audit.shouldClarify) return "";
	return [
		...audit.fuzzyPoints,
		...audit.missingSignals,
		audit.memoryPrompt
	].filter(Boolean).join("\n");
}
function buildPrecisionResult(userText, scene, word, precisionContext = "") {
	const firstClause = [userText.trim(), precisionContext.trim()].filter(Boolean).join("；").split(/[，。！？；,.!?;]/).find(Boolean)?.trim() || userText.trim();
	return {
		preciseName: `${scene === "书影音余韵" ? "体验余韵" : scene}里的具体感受命名`,
		concreteExplanation: `这段输入会先还原为具体线索，避免直接贴上“难受”或“复杂”这样的抽象标签。可见线索是“${firstClause}”，它说明这份感受有场景、触发点和表达需求；${word} 只是给这些线索一个外语停靠点，不替你做心理判断。`,
		copyableExpression: `我想表达的是这个具体瞬间：${firstClause}。${word} 能概括其中的触发点、余波和暂时说不出口的部分。`
	};
}
var words_default = /*#__PURE__*/ JSON.parse("[{\"word\":\"一期一会\",\"language\":\"Japanese\",\"pronunciation\":\"/it͡ɕiɡo it͡ɕie/\",\"literal_meaning\":\"一生一次的相会\",\"chinese_explanation\":\"把一次相遇视作不可重复、值得珍惜的时刻，尤其适合短暂相逢后必须分别的复杂感受\",\"english_approximation\":\"once-in-a-lifetime encounter\",\"emotion_tags\":[\"短暂相遇\",\"珍惜\",\"离别\",\"不可重复\",\"亲密关系\"],\"usage_scenario\":\"形容一段短暂却强烈的相遇、一次不可复现的告别或珍贵片刻\",\"user_search_description\":\"短暂相遇却不得不分别，快乐和悲伤交织，因为知道这次相逢不可重复而格外珍惜\",\"cultural_note\":\"常与日本茶道语境相关，提醒人把每一次相会都当作不可重来的唯一时刻\"},{\"word\":\"Pålegg\",\"language\":\"Norwegian\",\"pronunciation\":\"/poːleg/\",\"literal_meaning\":\"面包上的任何东西\",\"chinese_explanation\":\"一个涵盖所有面包配料的统称，体现挪威饮食文化的实用主义\",\"english_approximation\":\"spread, topping, sandwich filling\",\"emotion_tags\":[\"日常生活\",\"饮食文化\",\"实用主义\"],\"usage_scenario\":\"讨论三明治配料、准备早餐时使用\",\"user_search_description\":\"想用一个词概括所有能放在面包上的东西\",\"cultural_note\":\"挪威面包（brødmat）消费量极大\"},{\"word\":\"Commuovere\",\"language\":\"Italian\",\"pronunciation\":\"/komˈmwɔvere/\",\"literal_meaning\":\"被感动\",\"chinese_explanation\":\"被一个故事深深打动到流泪，一种温暖而非悲伤的感动\",\"english_approximation\":\"to be moved, to be touched\",\"emotion_tags\":[\"感动\",\"共情\",\"泪点\",\"温暖\"],\"usage_scenario\":\"读完小说、看完电影、听完故事后内心被击中时\",\"user_search_description\":\"被一个故事感动到哭的感觉，不是悲伤而是温暖的心碎\",\"cultural_note\":\"暗示不由自主地被带入，而非理性的感同身受\"},{\"word\":\"Mångata\",\"language\":\"Swedish\",\"pronunciation\":\"/ˈmoːnˌɡɑːta/\",\"literal_meaning\":\"月亮之路\",\"chinese_explanation\":\"月光洒在水面上形成的银色光带景观\",\"english_approximation\":\"moon path, moon reflection\",\"emotion_tags\":[\"自然之美\",\"浪漫\",\"宁静\",\"诗意\"],\"usage_scenario\":\"夜晚在海边或湖边看到月光在水中的倒影时\",\"user_search_description\":\"月光照在水面上像一条路一样延伸的那种美\",\"cultural_note\":\"由 måne（月亮）+ gata（街道）复合而成\"},{\"word\":\"Samar\",\"language\":\"Arabic\",\"pronunciation\":\"/ˈsamar/\",\"literal_meaning\":\"夜晚的交谈\",\"chinese_explanation\":\"日落后与好友长时间聊天到深夜，忘记时间的幸福沉浸\",\"english_approximation\":\"late-night conversation\",\"emotion_tags\":[\"友谊\",\"温暖\",\"夜晚\",\"亲密\",\"沉浸\"],\"usage_scenario\":\"和好友在夏夜篝火旁或阳台上聊到凌晨的场景\",\"user_search_description\":\"和好朋友聊天聊到忘了时间、深夜还不舍得散的幸福感\",\"cultural_note\":\"阿拉伯文化中夜晚社交是重要生活方式\"},{\"word\":\"Gezellig\",\"language\":\"Dutch\",\"pronunciation\":\"/ɣəˈzɛləx/\",\"literal_meaning\":\"舒适温馨\",\"chinese_explanation\":\"不仅是物理舒适，更是与人相处时内心暖融融的归属感\",\"english_approximation\":\"cozy, convivial, homey\",\"emotion_tags\":[\"温暖\",\"归属感\",\"亲密\",\"舒适\",\"社交\"],\"usage_scenario\":\"朋友聚会、家庭聚餐、烛光交谈等一切温暖的社交场合\",\"user_search_description\":\"不只是空间舒服，是和朋友家人在一起时心里暖融融的感觉\",\"cultural_note\":\"荷兰文化的核心概念之一，民族性格的组成部分\"},{\"word\":\"Glaswen\",\"language\":\"Welsh\",\"pronunciation\":\"/ˈɡlaswɛn/\",\"literal_meaning\":\"蓝色的微笑\",\"chinese_explanation\":\"一种挖苦嘲弄的假笑，让人浑身不自在\",\"english_approximation\":\"sarcastic smile, mocking grin\",\"emotion_tags\":[\"尴尬\",\"讽刺\",\"社交不适\",\"冷嘲热讽\"],\"usage_scenario\":\"社交场合收到一个让自己尴尬的嘲笑时\",\"user_search_description\":\"对方明明在笑但你感觉那笑容是冷的嘲讽的让人不舒服\",\"cultural_note\":\"蓝色在威尔士文化中带有冷淡的意味\"},{\"word\":\"Meraki\",\"language\":\"Greek\",\"pronunciation\":\"/mɛˈraki/\",\"literal_meaning\":\"倾注灵魂\",\"chinese_explanation\":\"全心全意投入一件事，把灵魂、创造力和爱都倾注其中\",\"english_approximation\":\"to do with passion, to put soul into\",\"emotion_tags\":[\"热爱\",\"专注\",\"创造\",\"灵魂\",\"仪式感\"],\"usage_scenario\":\"做菜、写作、画画、做手工等任何用心的创作行为\",\"user_search_description\":\"用全部心思和爱去做一件事，不在乎结果只觉得过程特别满足\",\"cultural_note\":\"源于希腊文化中对小事也值得用心对待的生活哲学\"},{\"word\":\"Kilig\",\"language\":\"Tagalog\",\"pronunciation\":\"/kiˈliɡ/\",\"literal_meaning\":\"胃里的蝴蝶\",\"chinese_explanation\":\"因浪漫可爱的经历内心涌起的酥麻心动感，无法控制笑容\",\"english_approximation\":\"butterflies in the stomach, giddy\",\"emotion_tags\":[\"心动\",\"恋爱\",\"甜蜜\",\"浪漫\",\"少女心\"],\"usage_scenario\":\"暗恋对象微笑、看到甜蜜视频、读到心跳加速的爱情故事时\",\"user_search_description\":\"看到特别可爱或浪漫的事情时心里像有蝴蝶在飞忍不住傻笑\",\"cultural_note\":\"菲律宾日常使用频率极高的情感词\"},{\"word\":\"Pisan Zapra\",\"language\":\"Malay\",\"pronunciation\":\"/ˈpisan ˈzapra/\",\"literal_meaning\":\"吃一根香蕉的时间\",\"chinese_explanation\":\"一个幽默的计时单位，约两分钟\",\"english_approximation\":\"the time it takes to eat a banana\",\"emotion_tags\":[\"幽默\",\"生活化\",\"随意\",\"时间感\"],\"usage_scenario\":\"表达\\\"稍等片刻\\\"时的幽默说法\",\"user_search_description\":\"一个好玩的时间单位大概两分钟那么长\",\"cultural_note\":\"马来民间传说认为香蕉树白天住着吃人的鬼魂\"},{\"word\":\"Jugaad\",\"language\":\"Hindi\",\"pronunciation\":\"/dʒʊˈɡɑːd/\",\"literal_meaning\":\"用最少资源办成事\",\"chinese_explanation\":\"资源匮乏但靠草根智慧和灵活应变硬是把问题解决了\",\"english_approximation\":\"frugal innovation, life hack, jury-rig\",\"emotion_tags\":[\"创造力\",\"韧性\",\"即兴\",\"生活智慧\",\"务实\"],\"usage_scenario\":\"用废旧材料修理东西、小成本创业、在资源缺乏中创新\",\"user_search_description\":\"资源不够条件很差但靠自己的聪明劲儿硬是把事搞定了\",\"cultural_note\":\"在印度已发展成一种全民认可的草根创新运动\"},{\"word\":\"Fika\",\"language\":\"Swedish\",\"pronunciation\":\"/ˈfiːka/\",\"literal_meaning\":\"喝咖啡吃点心聊天\",\"chinese_explanation\":\"暂停工作与朋友喝咖啡吃甜点聊天的社交仪式，非功能性咖啡时间\",\"english_approximation\":\"coffee break, coffee date\",\"emotion_tags\":[\"社交\",\"舒适\",\"日常仪式\",\"放松\",\"北欧生活\"],\"usage_scenario\":\"工作日上午或下午、周末约在咖啡馆的社交暂停\",\"user_search_description\":\"不是为了提神喝咖啡而是一种专门停下来社交的仪式\",\"cultural_note\":\"瑞典人咖啡消费量是欧盟平均值的近两倍，fika 是社会生活基本节奏\"},{\"word\":\"Hiraeth\",\"language\":\"Welsh\",\"pronunciation\":\"/ˈhɪraɪθ/\",\"literal_meaning\":\"对回不去的家的眷恋\",\"chinese_explanation\":\"对一个不存在或已消逝的故乡的深沉思念，混合伤感与渴望\",\"english_approximation\":\"homesickness, nostalgia, longing\",\"emotion_tags\":[\"怀旧\",\"乡愁\",\"失落\",\"悲伤\",\"不可逆转\"],\"usage_scenario\":\"离开故乡多年后想起童年土地，或怀念已被改变的面目全非的旧地\",\"user_search_description\":\"想念一个地方不是现在的样子而是记忆里可能从未真实存在过的故乡\",\"cultural_note\":\"深深嵌入威尔士民族认同，与威尔士语被边缘化的历史交织\"},{\"word\":\"Tíma\",\"language\":\"Icelandic\",\"pronunciation\":\"/ˈtiːma/\",\"literal_meaning\":\"舍不得花费\",\"chinese_explanation\":\"不是买不起而是内心未准备好，不愿把有限资源花在特定事物上\",\"english_approximation\":\"to be stingy with time/money\",\"emotion_tags\":[\"犹豫\",\"珍惜\",\"时间管理\",\"消费心理\"],\"usage_scenario\":\"考虑是否买一件贵但不必要的东西、是否花时间参加无感活动\",\"user_search_description\":\"我不是买不起或没时间但就是觉得不值得舍不得花出去\",\"cultural_note\":\"冰岛资源相对稀缺的环境塑造了这种审慎态度\"},{\"word\":\"Komorebi\",\"language\":\"Japanese\",\"pronunciation\":\"/komoɾebi/\",\"literal_meaning\":\"树叶间漏下的阳光\",\"chinese_explanation\":\"阳光穿过树叶缝隙形成斑驳光影的稍纵即逝的自然之美\",\"english_approximation\":\"sunlight filtering through leaves, dappled light\",\"emotion_tags\":[\"自然之美\",\"宁静\",\"瞬间\",\"日本美学\",\"光影\"],\"usage_scenario\":\"在森林或林荫道上散步看到阳光从树冠缝隙洒落时\",\"user_search_description\":\"走在树林里阳光从树叶缝隙漏下来斑斑驳驳的那种安静的美\",\"cultural_note\":\"体现了日本文化中对瞬间之美的敏锐捕捉\"},{\"word\":\"Razliubit\",\"language\":\"Russian\",\"pronunciation\":\"/rəzlʲʉˈbʲitʲ/\",\"literal_meaning\":\"不再爱了\",\"chinese_explanation\":\"从爱中脱落——眼睁睁看着曾经的爱褪色却无力挽回的苦涩\",\"english_approximation\":\"to fall out of love\",\"emotion_tags\":[\"失恋\",\"渐行渐远\",\"苦涩\",\"接受\",\"结束\"],\"usage_scenario\":\"一段感情走向尽头发现已不再像以前那样爱对方时\",\"user_search_description\":\"不是突然不爱了而是看着自己曾经的爱一点点褪色又苦又无奈\",\"cultural_note\":\"raz- 前缀表示\\\"分开\\\"，字面上就是\\\"把爱拆解掉\"},{\"word\":\"Kummerspeck\",\"language\":\"German\",\"pronunciation\":\"/ˈkʊmɐʃpɛk/\",\"literal_meaning\":\"悲伤培根\",\"chinese_explanation\":\"因情绪低落暴饮暴食而长出来的肥肉\",\"english_approximation\":\"comfort eating weight, grief weight\",\"emotion_tags\":[\"悲伤\",\"饮食\",\"自嘲\",\"体重\",\"情绪化进食\"],\"usage_scenario\":\"失恋后吃胖了、压力大时靠食物安慰自己导致的体重增加\",\"user_search_description\":\"失恋或心情不好的时候暴饮暴食胖起来的那几斤肉\",\"cultural_note\":\"德语擅长制造直白又带苦涩幽默的复合词\"},{\"word\":\"Boketto\",\"language\":\"Japanese\",\"pronunciation\":\"/boketto/\",\"literal_meaning\":\"发呆放空\",\"chinese_explanation\":\"什么也不想只是呆呆望着远方的放空状态\",\"english_approximation\":\"staring into space, daydreaming, zoning out\",\"emotion_tags\":[\"放空\",\"宁静\",\"闲散\",\"正念\",\"发呆\"],\"usage_scenario\":\"在海边看海、窗边看雨、坐公交时望着窗外无所事事\",\"user_search_description\":\"什么都不做什么都不想就只是望着远处发呆的那种放空感\",\"cultural_note\":\"对忙碌文化的温柔反抗——日本人专门命名了\\\"什么都不做\"},{\"word\":\"Vacilando\",\"language\":\"Spanish\",\"pronunciation\":\"/baθiˈlando/\",\"literal_meaning\":\"漫游\",\"chinese_explanation\":\"旅行时过程本身比目的地更重要，在路上即奖赏\",\"english_approximation\":\"wandering, roaming\",\"emotion_tags\":[\"自由\",\"探索\",\"漫游\",\"旅行\",\"活在当下\"],\"usage_scenario\":\"背包旅行不按计划、周末没有目的地开车兜风时的状态\",\"user_search_description\":\"不在乎到没到目的地在路上本身就很满足的那种旅行状态\",\"cultural_note\":\"曾被作家 John Steinbeck 在著作中使用传播\"},{\"word\":\"Karelu\",\"language\":\"Tulu\",\"pronunciation\":\"/ˈkarelu/\",\"literal_meaning\":\"勒痕\",\"chinese_explanation\":\"穿太紧的衣服或袜子后留在皮肤上的压痕\",\"english_approximation\":\"mark, imprint, indentation\",\"emotion_tags\":[\"身体感受\",\"日常生活\",\"细微痕迹\"],\"usage_scenario\":\"脱下紧身袜后脚踝上的印子、摘下手表后手腕上的压痕\",\"user_search_description\":\"袜子太紧了脱下来之后脚踝上留下的那道印子\",\"cultural_note\":\"图鲁语是印度西南部的一种达罗毗荼语系语言\"},{\"word\":\"Jayus\",\"language\":\"Indonesian\",\"pronunciation\":\"/ˈdʒajʊs/\",\"literal_meaning\":\"烂笑话\",\"chinese_explanation\":\"一个差到极点的冷笑话反而让人忍不住笑出来\",\"english_approximation\":\"a joke so bad it's funny\",\"emotion_tags\":[\"幽默\",\"尴尬\",\"冷\",\"社交\"],\"usage_scenario\":\"朋友讲了尬到不行的冷笑话、讲笑话的人自己忘了笑点还在硬撑\",\"user_search_description\":\"那个笑话冷到不行但因为实在太烂了我反而笑得停不下来\",\"cultural_note\":\"完美捕捉了低质量幽默如何产生反讽式娱乐\"},{\"word\":\"Shlimazel\",\"language\":\"Yiddish\",\"pronunciation\":\"/ʃlɪˈmɑzəl/\",\"literal_meaning\":\"倒霉蛋\",\"chinese_explanation\":\"天生的倒霉人——不是做错了什么而是坏事总自动找上门\",\"english_approximation\":\"unlucky person, jinx\",\"emotion_tags\":[\"倒霉\",\"同情\",\"幽默\",\"命运\",\"自嘲\"],\"usage_scenario\":\"形容身边那个一出门就下雨、一排队就前面刚卖完的人\",\"user_search_description\":\"不是自己做错了什么但什么事到他那儿都会出问题天生的倒霉命\",\"cultural_note\":\"shlemiel 打翻汤，shlimazel 被汤洒一身——两者常被一起提起\"},{\"word\":\"Ubuntu\",\"language\":\"Nguni Bantu\",\"pronunciation\":\"/ʊˈbʊntuː/\",\"literal_meaning\":\"我在你中找到价值\",\"chinese_explanation\":\"一种非洲哲学：人的价值通过与他人的连接而存在，我即是我们\",\"english_approximation\":\"humanity, human kindness, interconnectedness\",\"emotion_tags\":[\"归属感\",\"同理心\",\"社群\",\"人性\",\"非洲哲学\"],\"usage_scenario\":\"描述人与人之间的深层连接和互助精神\",\"user_search_description\":\"一种深深的连接感我的价值来自你你的价值也来自我我们是一体的\",\"cultural_note\":\"曼德拉和图图都将 ubuntu 作为南非和解的核心哲学\"},{\"word\":\"Gurfa\",\"language\":\"Arabic\",\"pronunciation\":\"/ˈɡurfa/\",\"literal_meaning\":\"一捧水/沙\",\"chinese_explanation\":\"一只手刚好能捧起来的那么一点水或沙\",\"english_approximation\":\"handful\",\"emotion_tags\":[\"身体感受\",\"自然\",\"质朴\",\"度量\"],\"usage_scenario\":\"在海滩捧一把沙子、在溪边捧一口水喝、不需要精确度量时\",\"user_search_description\":\"刚好一只手捧得住的那么一点点不管是水还是沙子\",\"cultural_note\":\"阿拉伯语中充满基于身体经验的生活度量单位\"},{\"word\":\"Trepverter\",\"language\":\"Yiddish\",\"pronunciation\":\"/ˈtrɛpvɛrtər/\",\"literal_meaning\":\"楼梯上的话\",\"chinese_explanation\":\"争论结束后才想到的绝妙回击——可惜已经太晚了\",\"english_approximation\":\"afterthought comeback, staircase wit\",\"emotion_tags\":[\"遗憾\",\"懊恼\",\"机智\",\"事后诸葛亮\",\"幽默\"],\"usage_scenario\":\"和别人争论完走了之后突然想到\\\"我当时应该这么说！\\\"的时刻\",\"user_search_description\":\"吵完架走了以后才突然想到一句特别绝的回话可惜已经错过时机了\",\"cultural_note\":\"与法语 l'esprit de l'escalier 几乎完全对应\"},{\"word\":\"Struisvogelpolitiek\",\"language\":\"Dutch\",\"pronunciation\":\"/ˈstrœysfoːɣəlpoliˌtik/\",\"literal_meaning\":\"鸵鸟政治\",\"chinese_explanation\":\"面对问题假装看不见、把头埋进沙子里逃避现实的态度\",\"english_approximation\":\"ostrich policy, head-in-the-sand approach\",\"emotion_tags\":[\"逃避\",\"讽刺\",\"反讽\",\"鸵鸟心态\"],\"usage_scenario\":\"描述公司或政府面对危机时选择回避而非正面处理的风格\",\"user_search_description\":\"明明问题就在眼前偏偏假装什么都没发生把头埋进沙子里不去管\",\"cultural_note\":\"虽然鸵鸟并不会真的把头埋进沙子，但这个意象深入人心\"},{\"word\":\"Wabi-Sabi\",\"language\":\"Japanese\",\"pronunciation\":\"/wabi sabi/\",\"literal_meaning\":\"侘寂\",\"chinese_explanation\":\"在不完美、不对称和不完整中发现美，接受生命无常的日本美学\",\"english_approximation\":\"beauty in imperfection\",\"emotion_tags\":[\"美感\",\"朴素\",\"不完美\",\"无常\",\"禅意\",\"日本美学\"],\"usage_scenario\":\"欣赏旧物、修补过的瓷器、不规则的陶器、自然老化的建筑\",\"user_search_description\":\"不完美反而更美——旧东西修补过的痕迹正因为会老会坏才格外动人\",\"cultural_note\":\"日本最具代表性的美学概念，起源于禅宗\"},{\"word\":\"Mamihlapinatapai\",\"language\":\"Yaghan\",\"pronunciation\":\"/mamihlapinataˈpai/\",\"literal_meaning\":\"都想做但都不愿先行动的对视\",\"chinese_explanation\":\"两人对视都明白对方想做什么但谁也不愿迈出第一步的微妙僵持瞬间\",\"english_approximation\":\"a look shared by two who both want the other to initiate\",\"emotion_tags\":[\"暧昧\",\"默契\",\"犹豫\",\"紧张\",\"恋爱\",\"沉默\"],\"usage_scenario\":\"两个人互相有好感但都不敢先表白、都想和好却等对方先开口\",\"user_search_description\":\"两个人对视心里都明白对方想要什么但谁都不愿意先开口的那个微妙瞬间\",\"cultural_note\":\"吉尼斯世界纪录\\\"最简洁的词\\\"之一，雅甘语是濒危语言\"},{\"word\":\"Resfeber\",\"language\":\"Swedish\",\"pronunciation\":\"/ˈreːsˌfeːbɛr/\",\"literal_meaning\":\"旅行热\",\"chinese_explanation\":\"出发旅行前兴奋与焦虑交织的心跳加速和坐立难安\",\"english_approximation\":\"pre-travel jitters, travel fever\",\"emotion_tags\":[\"期待\",\"焦虑\",\"兴奋\",\"旅行\",\"出发\",\"躁动\"],\"usage_scenario\":\"出发去机场前一晚、收拾行李时心跳加速时\",\"user_search_description\":\"马上要出发去旅行了心里又兴奋又紧张坐都坐不住的那种感觉\",\"cultural_note\":\"由 resa（旅行）+ feber（发烧）复合而成\"},{\"word\":\"Tiám\",\"language\":\"Farsi\",\"pronunciation\":\"/tiˈɒm/\",\"literal_meaning\":\"眼中的闪烁\",\"chinese_explanation\":\"初次遇见一个人时眼中闪过的一小片阳光——初识的好感信号\",\"english_approximation\":\"sparkle in the eye, twinkle\",\"emotion_tags\":[\"初见\",\"好感\",\"吸引力\",\"眼神\",\"社交\"],\"usage_scenario\":\"第一次见到某人时感到一种莫名的吸引和好感\",\"user_search_description\":\"第一次见到一个人时眼里闪了一下光好像有一种莫名的好感\",\"cultural_note\":\"波斯诗歌中大量描写眼神和目光的微妙变化\"},{\"word\":\"Ya'aburnee\",\"language\":\"Arabic\",\"pronunciation\":\"/jaʕˈburniː/\",\"literal_meaning\":\"愿你埋葬我\",\"chinese_explanation\":\"用\\\"我希望比你先死\\\"表达最深切的爱——无法承受失去你的痛苦\",\"english_approximation\":\"I hope I die before you\",\"emotion_tags\":[\"深爱\",\"依恋\",\"浪漫\",\"悲伤\",\"生死\",\"阿拉伯情感\"],\"usage_scenario\":\"情侣间最深情的告白、母亲对子女的深切爱意表达\",\"user_search_description\":\"一种爱到骨子里的告白——我希望我比你先走因为我承受不了失去你\",\"cultural_note\":\"听起来阴郁但在阿拉伯文化中是一种极为柔情的爱语\"},{\"word\":\"Feuillemort\",\"language\":\"French\",\"pronunciation\":\"/fœjmɔʁ/\",\"literal_meaning\":\"死叶色\",\"chinese_explanation\":\"秋天枯叶在凋零前褪了色的、介于金黄和棕褐之间的\\\"正在逝去中\\\"的颜色\",\"english_approximation\":\"the color of a dead leaf\",\"emotion_tags\":[\"秋天\",\"凋零\",\"美感\",\"自然\",\"忧伤\"],\"usage_scenario\":\"形容秋天的光线、褪色的布料、一个人苍白的脸色\",\"user_search_description\":\"秋天叶子快要枯萎但还没完全死掉的那种褪色了的颜色\",\"cultural_note\":\"由 feuille（叶子）+ mort（死）复合，法语的精致色彩词\"},{\"word\":\"Poronkusema\",\"language\":\"Finnish\",\"pronunciation\":\"/ˈporonˌkusema/\",\"literal_meaning\":\"驯鹿尿的距离\",\"chinese_explanation\":\"一个以北欧生态为基准的距离单位，约 7.5 公里\",\"english_approximation\":\"the distance a reindeer travels before peeing\",\"emotion_tags\":[\"幽默\",\"自然\",\"北方生活\",\"度量\",\"驯鹿\"],\"usage_scenario\":\"描述一个不太远但没有精确度量的距离时\",\"user_search_description\":\"用驯鹿能走多远才要尿尿来量距离大概是 7.5 公里\",\"cultural_note\":\"芬兰驯鹿文化（萨米人传统）的产物\"},{\"word\":\"Warmduscher\",\"language\":\"German\",\"pronunciation\":\"/ˈvaʁmˌdʊʃɐ/\",\"literal_meaning\":\"只洗温水澡的人\",\"chinese_explanation\":\"一个不敢走出舒适区的人——用洗澡习惯尖刻地嘲讽性格懦弱\",\"english_approximation\":\"wimp, softy, comfort-zone dweller\",\"emotion_tags\":[\"讽刺\",\"懦弱\",\"舒适区\",\"挑战\",\"幽默\"],\"usage_scenario\":\"嘲讽朋友不敢冒险拒绝尝试新事物时\",\"user_search_description\":\"一个连冷水澡都不敢洗的人——形容那种永远缩在舒适区里的怂人\",\"cultural_note\":\"德语中有大量类似的温和嘲讽型复合名词\"},{\"word\":\"Nunchi\",\"language\":\"Korean\",\"pronunciation\":\"/nuntʃʰi/\",\"literal_meaning\":\"眼色\",\"chinese_explanation\":\"通过观察倾听感知他人情绪和场域气氛的微妙社交本能\",\"english_approximation\":\"emotional intelligence, tact, reading the room\",\"emotion_tags\":[\"共情\",\"社交智慧\",\"观察\",\"情绪感知\"],\"usage_scenario\":\"在沉默中感知到对方情绪变化、知道什么时候该说什么话\",\"user_search_description\":\"不用对方说话就能从眼神和气氛里感觉出他现在是什么心情\",\"cultural_note\":\"在韩国是从幼年起就隐性培养的基本社交技能\"},{\"word\":\"'Akihi\",\"language\":\"Hawaiian\",\"pronunciation\":\"/ʔaˈkihi/\",\"literal_meaning\":\"问了路然后忘了\",\"chinese_explanation\":\"认真听人指路频频点头但一转身就完全不记得怎么走的尴尬\",\"english_approximation\":\"forgetting directions right after hearing them\",\"emotion_tags\":[\"健忘\",\"尴尬\",\"方向感\",\"生活趣事\"],\"usage_scenario\":\"问路之后走出两步就忘了怎么走时\",\"user_search_description\":\"认认真真问了路转头就忘了怎么走脑子一片空白\",\"cultural_note\":\"来自夏威夷原住民语言\"},{\"word\":\"Murr-ma\",\"language\":\"Wagiman\",\"pronunciation\":\"/ˈmʊrmɑː/\",\"literal_meaning\":\"用脚在水里找东西\",\"chinese_explanation\":\"光着脚在水里用脚趾探索寻找有形或无形之物的质朴行为\",\"english_approximation\":\"to search in water with your feet\",\"emotion_tags\":[\"自然\",\"触觉\",\"探索\",\"童年\",\"质朴\",\"水\"],\"usage_scenario\":\"在海滩赤脚涉水、在小溪用脚趾翻找漂亮石头\",\"user_search_description\":\"光着脚在水里面划来划去用脚趾头去找东西\",\"cultural_note\":\"瓦吉曼语是澳大利亚濒危语言，反映原住民与水环境亲密共存的传统\"},{\"word\":\"Goya\",\"language\":\"Urdu\",\"pronunciation\":\"/ˈɡojaː/\",\"literal_meaning\":\"仿佛\",\"chinese_explanation\":\"虽知是假但此刻全心相信——好故事让人暂时忘记现实的沉浸状态\",\"english_approximation\":\"suspension of disbelief, as-if\",\"emotion_tags\":[\"沉浸\",\"想象\",\"故事\",\"奇幻\",\"忘我\"],\"usage_scenario\":\"听精彩故事入迷、看小说完全沉浸、白日梦觉得自己去了另一个世界\",\"user_search_description\":\"明明知道是假的是故事但就是完全陷进去了像真的一样相信\",\"cultural_note\":\"乌尔都语诗歌中常见，表达想象力超越现实的力量\"},{\"word\":\"Drachenfutter\",\"language\":\"German\",\"pronunciation\":\"/ˈdʁaxənˌfʊtɐ/\",\"literal_meaning\":\"龙饲料\",\"chinese_explanation\":\"丈夫惹怒妻子后为了安抚她而送的讨好礼物——像给喷火龙投食\",\"english_approximation\":\"peace offering, apology gift\",\"emotion_tags\":[\"幽默\",\"道歉\",\"夫妻关系\",\"自嘲\",\"礼物\"],\"usage_scenario\":\"丈夫买了花或巧克力回家因为他又做错事了\",\"user_search_description\":\"惹老婆生气了赶紧买束花或礼物去\\\"喂龙\\\"免得被喷火\",\"cultural_note\":\"德语中大量用动物意象调侃人际关系\"},{\"word\":\"Szimpatikus\",\"language\":\"Hungarian\",\"pronunciation\":\"/ˈsimpatikuʃ/\",\"literal_meaning\":\"让人有好感\",\"chinese_explanation\":\"第一次见到某人直觉就觉得这是个好人——气场合拍的初识好感\",\"english_approximation\":\"likable, sympathetic\",\"emotion_tags\":[\"好感\",\"直觉\",\"第一印象\",\"社交\",\"信任\"],\"usage_scenario\":\"刚认识一个人就觉得\\\"这人不错\\\"想要表达这种直觉好感时\",\"user_search_description\":\"刚认识一个人还没说几句话就是直觉觉得这个人挺好的\",\"cultural_note\":\"匈牙利语中可当面使用\\\"你是一个 szimpatikus 的人\\\"表达好感\"},{\"word\":\"Iktsuarpok\",\"language\":\"Inuit\",\"pronunciation\":\"/ɪkˈtsuaʁpɔk/\",\"literal_meaning\":\"不停出去看有没有人来\",\"chinese_explanation\":\"等人时反复出门探望的坐立不安——在期待与不耐烦之间反复横跳\",\"english_approximation\":\"to keep going out to check if someone is coming\",\"emotion_tags\":[\"期待\",\"焦虑\",\"不耐烦\",\"等待\",\"躁动\"],\"usage_scenario\":\"等待朋友来访、等快递、等外卖时那一段\\\"怎么还不来\\\"的时间\",\"user_search_description\":\"等人等得坐不住隔几分钟就跑到门口看看来了没有\",\"cultural_note\":\"因纽特语中有大量描述等待的词汇，映照极地环境日常\"},{\"word\":\"Forelsket\",\"language\":\"Norwegian\",\"pronunciation\":\"/fɔrˈɛlskət/\",\"literal_meaning\":\"正在爱上\",\"chinese_explanation\":\"恋爱初始时的纯粹狂喜——全世界都是彩色的，没有坠落暗示只有快乐\",\"english_approximation\":\"falling in love, infatuation\",\"emotion_tags\":[\"恋爱\",\"狂喜\",\"幸福感\",\"最初心动\",\"美好\"],\"usage_scenario\":\"刚开始和某人约会每次见面都心跳不已的那个阶段\",\"user_search_description\":\"刚喜欢上一个人的时候全世界都是彩色的每天都轻飘飘的幸福感\",\"cultural_note\":\"挪威语有完整\\\"爱之进程\\\"词汇：forelsket→glad i→elsker\"},{\"word\":\"Tretår\",\"language\":\"Swedish\",\"pronunciation\":\"/ˈtreːtoːr/\",\"literal_meaning\":\"三注\",\"chinese_explanation\":\"第三杯咖啡——瑞典咖啡仪式中的专属词汇\",\"english_approximation\":\"third refill\",\"emotion_tags\":[\"咖啡文化\",\"仪式感\",\"社交\",\"日常\",\"瑞典\"],\"usage_scenario\":\"在瑞典 fika 期间喝完两杯后又续第三杯时\",\"user_search_description\":\"喝完一杯又续一杯再续——到第三杯时有一个专门的词\",\"cultural_note\":\"瑞典 fika 文化的延伸，体现对咖啡次序的宗教式认真\"},{\"word\":\"Tsundoku\",\"language\":\"Japanese\",\"pronunciation\":\"/tsɯndoku/\",\"literal_meaning\":\"买了书堆着不读\",\"chinese_explanation\":\"买了一堆书越堆越高就是不去翻——知识的囤积欲和可爱的自欺\",\"english_approximation\":\"book hoarding, leaving books unread\",\"emotion_tags\":[\"幽默\",\"自嘲\",\"阅读\",\"囤积\",\"知识欲\"],\"usage_scenario\":\"看着书架上没拆封的书、搬家时发现几十本没翻过的书\",\"user_search_description\":\"买了一堆书放在那儿越堆越高一直说会看但从来不去翻\",\"cultural_note\":\"tsunde（堆积）+ doku（读），doku 也谐音\\\"放置\"},{\"word\":\"Sgrìob\",\"language\":\"Scottish Gaelic\",\"pronunciation\":\"/sɡriːp/\",\"literal_meaning\":\"上唇的痒感\",\"chinese_explanation\":\"喝威士忌之前上唇出现的不可忽视的痒——这是前奏和仪式的一部分\",\"english_approximation\":\"the itch on your upper lip before sipping whiskey\",\"emotion_tags\":[\"期待\",\"仪式感\",\"饮酒\",\"苏格兰\",\"身体感受\"],\"usage_scenario\":\"端起一杯威士忌正准备喝时上唇发痒\",\"user_search_description\":\"端起一杯威士忌准备喝的时候上嘴唇会有点痒痒的那种感觉\",\"cultural_note\":\"苏格兰盖尔语中对威士忌文化的用词极为精细\"},{\"word\":\"Kabelsalat\",\"language\":\"German\",\"pronunciation\":\"/ˈkaːbəlzaˌlaːt/\",\"literal_meaning\":\"电线沙拉\",\"chinese_explanation\":\"一团乱糟糟纠缠不清的电线和数据线\",\"english_approximation\":\"cable spaghetti, tangled cables\",\"emotion_tags\":[\"日常\",\"幽默\",\"混乱\",\"技术生活\"],\"usage_scenario\":\"从抽屉里掏出一团缠死的耳机线、电脑桌下电线乱成一片\",\"user_search_description\":\"刚整理好的电线一转眼又缠成一团乱麻像个沙拉一样搅在一起\",\"cultural_note\":\"德语对混乱的食物比喻有独特爱好\"},{\"word\":\"Naz\",\"language\":\"Urdu\",\"pronunciation\":\"/naːz/\",\"literal_meaning\":\"被宠爱的自豪\",\"chinese_explanation\":\"知道自己被无条件深爱时心里那种又骄傲又踏实的感觉\",\"english_approximation\":\"the pride of being loved unconditionally\",\"emotion_tags\":[\"被爱\",\"骄傲\",\"安全感\",\"亲密\",\"幸福\"],\"usage_scenario\":\"知道有人愿意陪你去天涯海角心里感到被珍视时\",\"user_search_description\":\"知道自己被某个人无条件地深深爱着时心里又骄傲又踏实的感觉\",\"cultural_note\":\"乌尔都语在表达爱情细腻程度上极为丰富\"},{\"word\":\"Luftmensch\",\"language\":\"Yiddish\",\"pronunciation\":\"/ˈlʊftmɛnʃ/\",\"literal_meaning\":\"空气人\",\"chinese_explanation\":\"一个活在梦想里永远不接地气的理想主义者\",\"english_approximation\":\"dreamer, impractical person\",\"emotion_tags\":[\"梦想家\",\"不切实际\",\"空想\",\"理想主义\"],\"usage_scenario\":\"形容永远在幻想从不落地执行的朋友或艺术家类型\",\"user_search_description\":\"脑袋永远飘在天上不接地气活在梦想里现实的事一点儿不关心\",\"cultural_note\":\"Luft（空气）+ Mensch（人），既有一点浪漫又有一点批评\"},{\"word\":\"Saudade\",\"language\":\"Portuguese\",\"pronunciation\":\"/sawˈdadʒi/\",\"literal_meaning\":\"模糊而持续的渴望\",\"chinese_explanation\":\"对不可能存在之人/事的深深思念，混合爱、失落、怀旧与接受\",\"english_approximation\":\"longing, yearning, bittersweet nostalgia\",\"emotion_tags\":[\"思念\",\"怀旧\",\"失落\",\"渴望\",\"不可追回\"],\"usage_scenario\":\"想起逝去的亲人、怀念结束的感情、在异乡想念回不去的故乡\",\"user_search_description\":\"很想很想一个人或一个地方但心里知道那再也回不来了这种又甜又苦的思念\",\"cultural_note\":\"巴西将每年 1 月 30 日定为 Saudade 日，葡语文学核心母题\"},{\"word\":\"Cotisuelto\",\"language\":\"Caribbean Spanish\",\"pronunciation\":\"/kotiˈswelto/\",\"literal_meaning\":\"衬衫下摆松开\",\"chinese_explanation\":\"那种习惯不把衬衫塞进裤腰、随性自在有自己风格的男人\",\"english_approximation\":\"a man who wears his shirt untucked\",\"emotion_tags\":[\"风格\",\"随性\",\"自信\",\"男性气质\",\"时尚\"],\"usage_scenario\":\"形容那种自信放松不在意正装礼仪随性潇洒的男人\",\"user_search_description\":\"那种衬衫从来不塞进裤腰看起来特别自在随性的男人\",\"cultural_note\":\"加勒比西班牙语词汇，带有地域文化和审美色彩\"},{\"word\":\"Waldeinsamkeit\",\"language\":\"German\",\"pronunciation\":\"/ˈvaldʔaɪnzaːmkaɪt/\",\"literal_meaning\":\"森林孤独\",\"chinese_explanation\":\"独自在林中与自然深度连接——不是寂寞而是安详的独处\",\"english_approximation\":\"woodland solitude\",\"emotion_tags\":[\"独处\",\"自然\",\"宁静\",\"精神性\",\"德国浪漫主义\"],\"usage_scenario\":\"独自在森林中徒步、在古树下静坐时的感受\",\"user_search_description\":\"一个人在树林里不觉得孤独反而觉得和自然融为一体的安静幸福感\",\"cultural_note\":\"根植于德国浪漫主义传统，Wald 在德国文化中近乎神圣\"},{\"word\":\"Cafuné\",\"language\":\"Brazilian Portuguese\",\"pronunciation\":\"/kafuˈnɛ/\",\"literal_meaning\":\"温柔梳理恋人的头发\",\"chinese_explanation\":\"用手指轻轻穿过爱人头发慢慢梳理的极致亲密和安心感\",\"english_approximation\":\"running fingers tenderly through lover's hair\",\"emotion_tags\":[\"亲密\",\"温柔\",\"恋爱\",\"身体接触\",\"安全感\"],\"usage_scenario\":\"两人亲密待在一起一个人温柔抚弄另一个人头发时\",\"user_search_description\":\"温柔地用手指穿过恋人的头发那种说不出的亲密和安心\",\"cultural_note\":\"被认为是典型的巴西亲密文化词汇\"},{\"word\":\"Kalpa\",\"language\":\"Sanskrit\",\"pronunciation\":\"/ˈkəlpə/\",\"literal_meaning\":\"劫\",\"chinese_explanation\":\"宇宙尺度时间流逝的感觉——星辰运转、亿万年的永恒与渺小\",\"english_approximation\":\"eon, cosmic time\",\"emotion_tags\":[\"时间\",\"宇宙\",\"渺小感\",\"永恒\",\"印度哲学\"],\"usage_scenario\":\"仰望星空感到自身渺小、思考生命短暂与宇宙永恒对比时\",\"user_search_description\":\"不是普通的时间流逝而是星辰运转宇宙级别的那种时间感觉得自己特别渺小\",\"cultural_note\":\"在印度教和佛教宇宙观中是基本时间单位，约 43.2 亿年\"},{\"word\":\"Besa\",\"language\":\"阿尔巴尼亚语\",\"pronunciation\":\"/ˈbɛsa/\",\"literal_meaning\":\"信义\",\"chinese_explanation\":\"一种以荣誉为担保的承诺——说到做到，用生命捍卫诺言。通常被译作\\\"信仰\\\"或\\\"誓言\\\"，但比英语中的对应词更重。\",\"english_approximation\":\"faith, oath, pledge of honor\",\"emotion_tags\":[\"荣誉\",\"承诺\",\"忠诚\",\"信任\"],\"usage_scenario\":\"郑重许下诺言、承诺守护某人或某事时。\",\"user_search_description\":\"不只是嘴上答应，而是用整个人的荣誉来担保一定会做到\",\"cultural_note\":\"阿尔巴尼亚传统文化中的核心道德概念。\"},{\"word\":\"La douleur exquise\",\"language\":\"法语\",\"pronunciation\":\"/la dulœʁ ɛkskiz/\",\"literal_meaning\":\"精致的痛\",\"chinese_explanation\":\"渴望一个你永远得不到的人时那种\\\"精致的痛苦\\\"——比如单恋一个永远不会回应你的人。\",\"english_approximation\":\"the exquisite pain of unrequited love\",\"emotion_tags\":[\"单恋\",\"痛苦\",\"渴望\",\"浪漫\",\"心碎\"],\"usage_scenario\":\"暗恋、单相思、明知道对方不会爱你却仍然放不下。\",\"user_search_description\":\"爱一个永远不可能在一起的人，那种又美又痛的折磨\",\"cultural_note\":\"法语作为\\\"爱的语言\\\"，自然有表达爱情最痛一面的词汇。\"},{\"word\":\"Retrouvailles\",\"language\":\"法语\",\"pronunciation\":\"/ʁətʁuvaj/\",\"literal_meaning\":\"重新找到\",\"chinese_explanation\":\"与深深在乎的人久别重逢时的情感——不是普通的\\\"reunion\\\"，而是包含了所有思念、喜悦和拥抱的温度。\",\"english_approximation\":\"reunion, refinding\",\"emotion_tags\":[\"重逢\",\"喜悦\",\"思念\",\"爱\",\"感动\"],\"usage_scenario\":\"机场接机时的热泪盈眶、多年不见的老友相拥。\",\"user_search_description\":\"好久不见的人终于又见面了，抱住对方的那种说不出的喜悦\",\"cultural_note\":\"英语 reunion 不足以表达 retrouvailles 中的情感分量。\"},{\"word\":\"Cavoli riscaldati\",\"language\":\"意大利语\",\"pronunciation\":\"/ˈkaːvoli riskalˈdaːti/\",\"literal_meaning\":\"回锅包菜\",\"chinese_explanation\":\"试图重燃一段已经结束的旧情——像回锅的白菜，不新鲜也不好吃。\",\"english_approximation\":\"reheated cabbage (attempting to revive an old romance)\",\"emotion_tags\":[\"旧情\",\"失败\",\"徒劳\",\"苦涩\"],\"usage_scenario\":\"和前任复合但发现已经回不到从前。\",\"user_search_description\":\"想重新开始一段已经过去的感情，但就像回锅的白菜再也没有原来的味道了\",\"cultural_note\":\"意大利人用食物比喻感情的一贯风格。\"},{\"word\":\"Koi no yokan\",\"language\":\"日语\",\"pronunciation\":\"/koi no jokan/\",\"literal_meaning\":\"恋爱的预感\",\"chinese_explanation\":\"第一次遇见某人时那种\\\"我知道我们迟早会爱上对方\\\"的预感——不是一见钟情，而是更现实的\\\"一见就知会钟情\\\"。\",\"english_approximation\":\"premonition of love\",\"emotion_tags\":[\"预感\",\"爱情\",\"缘分\",\"期待\"],\"usage_scenario\":\"第一次见面就觉得\\\"这个人以后会对我很重要\\\"。\",\"user_search_description\":\"第一次见到一个人就有种预感：我们以后一定会在一起的\",\"cultural_note\":\"koi（恋）+ yokan（予感），比\\\"一见钟情\\\"更含蓄、更日式。\"},{\"word\":\"Ciğerpare\",\"language\":\"土耳其语\",\"pronunciation\":\"/dʒiːeɾpaːˈɾe/\",\"literal_meaning\":\"肝的一部分\",\"chinese_explanation\":\"我的肝脏的一块\\\"——用来形容你爱得和爱自己生命一样深的人。恋人或密友之间可以互称 ciğerparem（我的肝）。\",\"english_approximation\":\"someone you love as much as your own body\",\"emotion_tags\":[\"深爱\",\"生命\",\"亲密\",\"土耳其\"],\"usage_scenario\":\"土耳其恋人之间最深情的互相称呼。\",\"user_search_description\":\"你就像我的肝一样——是我身体和生命的一部分，没了你我活不下去\",\"cultural_note\":\"在波斯语中也有对应词 jegar pare，表达同样的深爱。\"},{\"word\":\"Viraha\",\"language\":\"印地语\",\"pronunciation\":\"/ʋɪˈɾɑːɦə/\",\"literal_meaning\":\"分离\",\"chinese_explanation\":\"分开之后才意识到自己爱上了一个人——那种\\\"失去了才懂珍惜\\\"的痛。\",\"english_approximation\":\"realizing you love someone only after separation\",\"emotion_tags\":[\"后悔\",\"爱\",\"失落\",\"分离\"],\"usage_scenario\":\"分手之后才意识到自己有多爱对方、朋友搬走后才发现离不开 ta。\",\"user_search_description\":\"分开以后才发现原来自己那么爱 ta，但已经来不及了\",\"cultural_note\":\"印度诗歌和音乐中反复出现的主题——viraha 是古典爱情叙事的核心。\"},{\"word\":\"Odnoliub\",\"language\":\"俄语\",\"pronunciation\":\"/ɐdnɐˈlʲup/\",\"literal_meaning\":\"一生只爱一人\",\"chinese_explanation\":\"一个一生中只爱过一个人、或一次只能爱一个人的人——一种情感上的\\\"单线程\\\"。\",\"english_approximation\":\"someone who loves only one person in their life\",\"emotion_tags\":[\"忠诚\",\"单一\",\"爱情\",\"专一\"],\"usage_scenario\":\"描述一个\\\"初恋即终身\\\"的人。\",\"user_search_description\":\"一生只爱过一个人，心里装不下第二个的那种人\",\"cultural_note\":\"odno（一）+ liub（爱），俄语中情感专一的命名。\"},{\"word\":\"Oodal\",\"language\":\"泰米尔语\",\"pronunciation\":\"/uːɖal/\",\"literal_meaning\":\"假生气\",\"chinese_explanation\":\"情侣吵架之后那种夸张的、假的愤怒——心里已经消气了但表面上还在赌气。\",\"english_approximation\":\"exaggerated fake anger after a lovers' quarrel\",\"emotion_tags\":[\"情侣\",\"假生气\",\"撒娇\",\"和好\"],\"usage_scenario\":\"情侣小吵之后，一方嘴上说着\\\"我没事\\\"但满脸写着不开心。\",\"user_search_description\":\"吵完了其实不气了，但还要装一会儿生气让对方来哄我\",\"cultural_note\":\"泰米尔语对爱情中微情绪状态的精细命名。\"},{\"word\":\"Tampó\",\"language\":\"他加禄语（菲律宾）\",\"pronunciation\":\"/tamˈpoʔ/\",\"literal_meaning\":\"闹别扭\",\"chinese_explanation\":\"因为感觉被伤害而对某人收起自己的热情和亲密——一种轻微的\\\"冷战\\\"和\\\"赌气\\\"。通常发生在亲密关系中。\",\"english_approximation\":\"mild grudge, withdrawal of affection due to hurt\",\"emotion_tags\":[\"赌气\",\"冷战\",\"亲密关系\",\"受伤\"],\"usage_scenario\":\"老公忘了结婚纪念日，老婆冷着脸不说话——她在 tampó。\",\"user_search_description\":\"不是大吵大闹，就是不理你、不给你好脸看——你得罪我了，我在生气但我不说\",\"cultural_note\":\"菲律宾家庭和情侣关系中的常见状态。\"},{\"word\":\"Manja\",\"language\":\"马来语\",\"pronunciation\":\"/ˈmandʒa/\",\"literal_meaning\":\"撒娇/宠溺\",\"chinese_explanation\":\"对在乎的人（伴侣、孩子）展示出极度的外露爱意和亲密——宠溺、撒娇、百般呵护。\",\"english_approximation\":\"to pamper, to show excessive affection\",\"emotion_tags\":[\"宠溺\",\"亲密\",\"撒娇\",\"爱\"],\"usage_scenario\":\"小孩对父母撒娇、情侣之间的黏腻互动。\",\"user_search_description\":\"对喜欢的人特别黏、特别腻、使劲撒娇要宠的那种状态\",\"cultural_note\":\"与中文\\\"撒娇\\\"有重叠但不完全一样——manja 更强调\\\"被宠\\\"的甜蜜感。\"},{\"word\":\"Dor\",\"language\":\"罗马尼亚语\",\"pronunciation\":\"/dor/\",\"literal_meaning\":\"思念\",\"chinese_explanation\":\"对某人的一种悲伤的渴望和思念——比单纯的\\\"miss\\\"更沉重，带有一种灵魂级别的空缺感。\",\"english_approximation\":\"sad longing, yearning for someone\",\"emotion_tags\":[\"思念\",\"悲伤\",\"渴望\",\"深沉\"],\"usage_scenario\":\"在异国他乡想起远方的爱人、对逝去亲人的魂牵梦萦。\",\"user_search_description\":\"不是普通的想念，而是那种深入骨髓的、有点痛的思念\",\"cultural_note\":\"罗马尼亚诗歌和民歌的核心情感主题，相当于葡语的 saudade 但更偏向\\\"对具体某人的思念\\\"。\"},{\"word\":\"Házisárkány\",\"language\":\"匈牙利语\",\"pronunciation\":\"/ˈhaːziʃaːrkaːɲ/\",\"literal_meaning\":\"家养龙\",\"chinese_explanation\":\"对自己那个总爱唠叨的另一半的昵称——\\\"我家的那条龙\\\"。\",\"english_approximation\":\"domestic dragon (nickname for a nagging spouse)\",\"emotion_tags\":[\"幽默\",\"夫妻\",\"唠叨\",\"爱恨交织\"],\"usage_scenario\":\"夫妻间半开玩笑地说\\\"我家那条龙又发火了\\\"。\",\"user_search_description\":\"用'家养喷火龙'来称呼那个总爱唠叨的老公/老婆，又气又爱\",\"cultural_note\":\"匈牙利版 Drachenfutter（龙饲料）的另一半——喂龙的饲料和龙本身都有了。\"},{\"word\":\"Elmosolyodni\",\"language\":\"匈牙利语\",\"pronunciation\":\"/ˈɛlmoʃojodni/\",\"literal_meaning\":\"不禁微笑\",\"chinese_explanation\":\"当一件事并不是特别好笑、但你仍然忍不住嘴角上扬时的那种微笑。\",\"english_approximation\":\"to smile despite nothing being particularly funny\",\"emotion_tags\":[\"微笑\",\"温暖\",\"不由自住\"],\"usage_scenario\":\"听到一个并不好笑的笑话但还是笑了、看到某个温馨画面不自觉地微笑。\",\"user_search_description\":\"这件事一点都不好笑，但我还是忍不住笑了\",\"cultural_note\":\"匈牙利语的日常微表情词汇。\"},{\"word\":\"Hygge\",\"language\":\"丹麦语\",\"pronunciation\":\"/ˈhyɡə/\",\"literal_meaning\":\"温馨\",\"chinese_explanation\":\"在烛光下和家人朋友窝在一起，盖着温暖的毯子，享受当下的安宁——一种被温暖包围的幸福感。不仅是物理的舒适，更是情感的安全。\",\"english_approximation\":\"coziness, comfort, warmth\",\"emotion_tags\":[\"温暖\",\"舒适\",\"亲密\",\"幸福\",\"丹麦文化\"],\"usage_scenario\":\"冬天晚上点蜡烛、喝热巧克力、和朋友在壁炉边聊天。\",\"user_search_description\":\"在家点着蜡烛、裹着毯子、和喜欢的人待在一起的那种暖洋洋的幸福感\",\"cultural_note\":\"丹麦的国民生活哲学，和荷兰的 gezellig 有相似之处但更强调居家和独处时的舒适。\"},{\"word\":\"Arbejdsglæde\",\"language\":\"丹麦语\",\"pronunciation\":\"/ˈɑːbɑjdsˌɡlɛːðə/\",\"literal_meaning\":\"工作快乐\",\"chinese_explanation\":\"从工作中获得的深层幸福感、满足感和成就感——不只是\\\"喜欢上班\\\"，而是工作本身就是快乐的来源。\",\"english_approximation\":\"job satisfaction, happiness at work\",\"emotion_tags\":[\"工作\",\"满足\",\"幸福\",\"北欧生活\"],\"usage_scenario\":\"周一早上带着期待去上班、对自己的职业充满热情。\",\"user_search_description\":\"不是因为钱或别的原因，而是工作本身让你每天醒来都觉得快乐和充实\",\"cultural_note\":\"这个词在北欧语言中普遍存在（瑞典语、挪威语等也有对应词），反映了北欧对工作-生活平衡的重视。\"},{\"word\":\"Aspaldiko\",\"language\":\"巴斯克语\",\"pronunciation\":\"/asˈpaldiko/\",\"literal_meaning\":\"久别重逢的喜悦\",\"chinese_explanation\":\"和很久没见的人重逢时那种纯粹的狂喜和幸福。\",\"english_approximation\":\"joy of reunion after a long time\",\"emotion_tags\":[\"重逢\",\"喜悦\",\"友谊\",\"幸福\"],\"usage_scenario\":\"和老友多年后重逢、在机场迎接久别的亲人。\",\"user_search_description\":\"好久没见的人突然出现在眼前时那种开心到飞起的感觉\",\"cultural_note\":\"巴斯克语是一种与印欧语系无关的孤立语言，包含许多独特的文化概念。\"},{\"word\":\"Ailyak\",\"language\":\"保加利亚语\",\"pronunciation\":\"/ajˈljak/\",\"literal_meaning\":\"从容不迫\",\"chinese_explanation\":\"一种精致的生活艺术——一切都不急不躁，享受过程本身，不为结果焦虑。\",\"english_approximation\":\"the art of doing everything calmly without rushing\",\"emotion_tags\":[\"从容\",\"慢生活\",\"享受\",\"放松\"],\"usage_scenario\":\"在保加利亚的海边小镇慢悠悠地度过一天，不赶时间。\",\"user_search_description\":\"不慌不忙、不赶时间、做什么事都是一种享受的状态\",\"cultural_note\":\"保加利亚版的\\\"慢生活美学\\\"。\"},{\"word\":\"Voorpret\",\"language\":\"荷兰语\",\"pronunciation\":\"/ˈvoːrprɛt/\",\"literal_meaning\":\"前乐\",\"chinese_explanation\":\"在事件发生之前就已经开始享受的那种期待之乐——比如布置派对时已经忍不住跳起舞来。\",\"english_approximation\":\"pre-fun, joyful anticipation\",\"emotion_tags\":[\"期待\",\"快乐\",\"预热\",\"仪式感\"],\"usage_scenario\":\"期待假期、准备生日派对、倒数旅行日子的那段时间。\",\"user_search_description\":\"事情还没发生，光是在准备和等待的过程中就已经开心得不行了\",\"cultural_note\":\"荷兰人用一个词就把\\\"期待本身就是一种享受\\\"捕捉到了。\"},{\"word\":\"Sobremesa\",\"language\":\"西班牙语\",\"pronunciation\":\"/soβɾeˈmesa/\",\"literal_meaning\":\"桌上时光\",\"chinese_explanation\":\"吃完饭后大家继续坐在桌边聊天、放松、享受彼此陪伴的那段时间——西班牙文化中最珍贵的社交时光。\",\"english_approximation\":\"time spent chatting at the table after a meal\",\"emotion_tags\":[\"美食\",\"社交\",\"悠闲\",\"西班牙文化\"],\"usage_scenario\":\"西班牙家庭午饭后聊两三个小时不起身。\",\"user_search_description\":\"吃完饭盘子都空了，但大家就是坐着不走、一直聊天的那个美好时光\",\"cultural_note\":\"西班牙人吃饭的核心——重要的不只是食物，更是 sobremesa。\"},{\"word\":\"Lagom\",\"language\":\"瑞典语\",\"pronunciation\":\"/ˈlɑːɡɔm/\",\"literal_meaning\":\"刚刚好\",\"chinese_explanation\":\"不是太多也不是太少，就是\\\"刚刚好\\\"——不多不少、恰到好处。瑞典生活方式的核心哲学。\",\"english_approximation\":\"just the right amount, neither too much nor too little\",\"emotion_tags\":[\"适度\",\"平衡\",\"瑞典哲学\",\"中庸\"],\"usage_scenario\":\"你觉得够了吗？\\\"——\\\"Lagom（刚好）。\",\"user_search_description\":\"不多不少、刚刚好——不是贪婪也不是匮乏，就是那个恰到好处的点\",\"cultural_note\":\"传说中的\\\"瑞典国民口头禅\\\"，体现了北欧的平衡文化。\"},{\"word\":\"Mysa\",\"language\":\"瑞典语\",\"pronunciation\":\"/ˈmyːsa/\",\"literal_meaning\":\"享受在家\",\"chinese_explanation\":\"在家感到满足、舒适和享受——特别强调\\\"在家\\\"这个场景。与丹麦的 hygge 类似但有区别。\",\"english_approximation\":\"to feel content and cozy at home\",\"emotion_tags\":[\"在家\",\"舒适\",\"满足\",\"北欧\"],\"usage_scenario\":\"周五晚上窝在沙发上裹着毯子看电影。\",\"user_search_description\":\"哪都不想去，就在家里窝着，特别舒服特别满足\",\"cultural_note\":\"与 hygge 的区别：mysa 特指在家里的舒适状态。\"},{\"word\":\"Gökotta\",\"language\":\"瑞典语\",\"pronunciation\":\"/ˈjøːˌkɔta/\",\"literal_meaning\":\"清晨听鸟\",\"chinese_explanation\":\"黎明时分起床，走到户外，只为听鸟儿唱歌。\",\"english_approximation\":\"waking up at dawn to hear birds singing\",\"emotion_tags\":[\"自然\",\"清晨\",\"宁静\",\"鸟鸣\",\"诗意\"],\"usage_scenario\":\"瑞典的春日清晨，天刚亮就出门，在森林边缘或花园里听鸟鸣。\",\"user_search_description\":\"早起不为别的，就是为了出门听听早晨的鸟叫\",\"cultural_note\":\"gök（布谷鸟）+ otta（清晨），瑞典人与自然亲密关系的典型写照。\"},{\"word\":\"Duktig\",\"language\":\"瑞典语\",\"pronunciation\":\"/ˈdɵktɪɡ/\",\"literal_meaning\":\"能干\",\"chinese_explanation\":\"一个很高的赞美——表示一个人技能强、能干、很努力。既是表扬成年人也是夸孩子的话（\\\"乖！真棒！\\\"）。\",\"english_approximation\":\"skilled, capable, hard-working\",\"emotion_tags\":[\"表扬\",\"能力\",\"努力\",\"北欧\"],\"usage_scenario\":\"同事完成了一个艰难的项目、小孩考试得了满分。\",\"user_search_description\":\"不只是能干，而是那种让人觉得你靠谱、能力强、肯下功夫的综合赞美\",\"cultural_note\":\"来自动词 duga（有资格/合格）。\"},{\"word\":\"Meriggiare\",\"language\":\"意大利语\",\"pronunciation\":\"/meridˈdʒaːre/\",\"literal_meaning\":\"午休\",\"chinese_explanation\":\"在正午时分休息放松，通常在一个阳光下的阴凉处——意式午后的慵懒。\",\"english_approximation\":\"to rest at midday in a shady spot\",\"emotion_tags\":[\"午休\",\"慵懒\",\"阳光\",\"意大利\"],\"usage_scenario\":\"炎热的意大利午后在橄榄树下打个盹。\",\"user_search_description\":\"大中午的找个阴凉地儿歇一会儿，什么都不想就是享受阳光和安静\",\"cultural_note\":\"源自 meriggio（正午），意大利慢生活的动词版。\"},{\"word\":\"Fare la scarpetta\",\"language\":\"意大利语\",\"pronunciation\":\"/ˈfaːre la skarˈpetta/\",\"literal_meaning\":\"做小鞋子\",\"chinese_explanation\":\"用餐后拿一块面包把盘子里的酱汁擦干净再吃掉的举动——意大利餐桌上的经典动作。\",\"english_approximation\":\"to mop up the sauce on your plate with bread\",\"emotion_tags\":[\"美食\",\"满足\",\"意大利文化\",\"餐桌礼仪\"],\"usage_scenario\":\"意面吃完后用面包把盘子里的番茄酱擦得干干净净。\",\"user_search_description\":\"吃完面用面包把盘子里的酱汁擦干净吃掉——太香了不能浪费\",\"cultural_note\":\"在一些正式场合被认为不太礼貌，但在家庭和日常中是被鼓励的\\\"认可主厨\\\"行为。\"},{\"word\":\"Utepils\",\"language\":\"挪威语\",\"pronunciation\":\"/ˈʉːtəpɪls/\",\"literal_meaning\":\"户外啤酒\",\"chinese_explanation\":\"经历过漫长冬天之后，第一次坐在户外阳光下喝啤酒的行为——一种季节性的、仪式性的快乐。\",\"english_approximation\":\"enjoying a beer outside on a sunny day\",\"emotion_tags\":[\"春天\",\"阳光\",\"啤酒\",\"北欧\",\"复苏\"],\"usage_scenario\":\"挪威春天第一缕暖阳下，所有人涌向咖啡馆户外座位喝啤酒。\",\"user_search_description\":\"熬过了一个漫长的冬天，第一次坐在外面晒太阳喝啤酒——太幸福了\",\"cultural_note\":\"ute（外面）+ pils（拉格啤酒），挪威版\\\"春来了\\\"的仪式感。\"},{\"word\":\"Shemomedjam\",\"language\":\"格鲁吉亚语\",\"pronunciation\":\"/ʃɛmɔmɛdʒam/\",\"literal_meaning\":\"不由自主地吃\",\"chinese_explanation\":\"明明不饿，但因为东西太好吃了所以停不下来——一种\\\"嘴巴想吃，肚子说不\\\"的状态。\",\"english_approximation\":\"eating because it's delicious, not because you're hungry\",\"emotion_tags\":[\"美食\",\"贪吃\",\"快乐\",\"失控\"],\"usage_scenario\":\"饭后看到甜点还是忍不住吃、尝了一口就再也放不下筷子。\",\"user_search_description\":\"一点都不饿但是太好吃了根本停不下来\",\"cultural_note\":\"格鲁吉亚以美食闻名，shemomedjam 是这种饮食文化中不可或缺的体验词。\"},{\"word\":\"Merak\",\"language\":\"塞尔维亚语\",\"pronunciation\":\"/měraːk/\",\"literal_meaning\":\"微小快乐\",\"chinese_explanation\":\"每日追求那些微小但真实的快乐——累积起来就是满足感、成就感和与宇宙的和韵。一种生活哲学。\",\"english_approximation\":\"pursuit of small daily pleasures leading to fulfillment\",\"emotion_tags\":[\"幸福\",\"小确幸\",\"满足\",\"哲学\"],\"usage_scenario\":\"每天早上一杯好咖啡、下班路上的夕阳——寻找日常中的小确幸。\",\"user_search_description\":\"每天找一点小小的快乐，不贪多，加起来就是满满的幸福感\",\"cultural_note\":\"与希腊语的 meraki（倾注灵魂）同根但语义独立发展。\"},{\"word\":\"Estrenar\",\"language\":\"西班牙语\",\"pronunciation\":\"/estɾeˈnaɾ/\",\"literal_meaning\":\"首次使用\",\"chinese_explanation\":\"第一次穿、用、做某件事——\\\"第一次\\\"的专属动词。\",\"english_approximation\":\"to do/wear/use something for the first time\",\"emotion_tags\":[\"新鲜\",\"首次\",\"仪式感\",\"快乐\"],\"usage_scenario\":\"穿新鞋的第一天、新手机开机时的兴奋。\",\"user_search_description\":\"第一次穿新衣服、第一次用新手机时那种'全新的'满足感\",\"cultural_note\":\"英语没有一个词能代替 estrenar。\"},{\"word\":\"Nepakartojama\",\"language\":\"立陶宛语\",\"pronunciation\":\"/nɛpakɐrˈtojɐmɐ/\",\"literal_meaning\":\"不可重复的\",\"chinese_explanation\":\"一个完美的、永远不会再出现的时刻或情境——一次性的、独一无二的美好体验。\",\"english_approximation\":\"a never-to-be-repeated perfect moment\",\"emotion_tags\":[\"完美\",\"瞬间\",\"珍贵\",\"独一无二\"],\"usage_scenario\":\"那个夕阳、那个音乐、那个人——一切完美得无法重现的瞬间。\",\"user_search_description\":\"那个时刻太完美了，心里知道这辈子都不会再有第二次了\",\"cultural_note\":\"立陶宛语对\\\"不可复制之美\\\"的精准命名。\"},{\"word\":\"Firgun\",\"language\":\"希伯来语\",\"pronunciation\":\"/fiʁˈɡun/\",\"literal_meaning\":\"为他人高兴\",\"chinese_explanation\":\"一种不夹杂任何嫉妒和私心的、纯粹的为他人成就感到真诚喜悦和幸福的能力——以色列文化中的核心美德。\",\"english_approximation\":\"genuine happiness for someone else's success\",\"emotion_tags\":[\"慷慨\",\"喜悦\",\"无私\",\"以色列文化\"],\"usage_scenario\":\"朋友升职了你真心替 ta 开心、看到竞争对手的成功也不嫉妒。\",\"user_search_description\":\"看到别人成功了，不嫉妒、不酸，心里就是真心为 ta 高兴\",\"cultural_note\":\"很多人认为 firgun 是以色列社会凝聚力的秘密之一。\"},{\"word\":\"Dugnad\",\"language\":\"挪威语\",\"pronunciation\":\"/ˈdʉːɡnɑd/\",\"literal_meaning\":\"社区义工日\",\"chinese_explanation\":\"挪威社区定期组织的一种志愿劳动日——邻居们一起出来清理、修缮、美化社区环境。做完之后通常有咖啡和蛋糕作为奖励。\",\"english_approximation\":\"community volunteer day\",\"emotion_tags\":[\"社区\",\"合作\",\"责任\",\"北欧生活\"],\"usage_scenario\":\"春天来了邻居们一起打扫街道、秋天一起扫落叶。\",\"user_search_description\":\"和邻居们一起出来打扫街道、修理公共设施的那种社区日——干完活一起喝咖啡\",\"cultural_note\":\"每个挪威人都参加过 dugnad。在换季时尤其常见。\"},{\"word\":\"Parea\",\"language\":\"希腊语\",\"pronunciation\":\"/paˈrea/\",\"literal_meaning\":\"朋友聚会\",\"chinese_explanation\":\"一群朋友聚在一起分享人生经验、哲学、价值观和想法——不是简单的\\\"hang out\\\"，而是一种智识和情感上的深度交流。\",\"english_approximation\":\"group of friends sharing life together\",\"emotion_tags\":[\"友谊\",\"哲学\",\"交流\",\"希腊文化\"],\"usage_scenario\":\"希腊人围坐在咖啡馆桌边边喝咖啡边聊人生。\",\"user_search_description\":\"和朋友不只是吃喝，而是坐下来聊人生、聊想法的那种深度聚会\",\"cultural_note\":\"在古希腊传统中，parea 是思想交流的基本单元。\"},{\"word\":\"Psithurism\",\"language\":\"希腊语\",\"pronunciation\":\"/ˈpsɪθjʊˌrɪzəm/\",\"literal_meaning\":\"低语声\",\"chinese_explanation\":\"风吹过树叶时发出的那种沙沙声——一种充满诗意的自然听觉体验。\",\"english_approximation\":\"the sound of wind rustling through leaves\",\"emotion_tags\":[\"自然\",\"声音\",\"宁静\",\"诗意\"],\"usage_scenario\":\"在树林中听到风吹动树叶的声音。\",\"user_search_description\":\"风吹过树叶时那种沙沙的声音，听着特别安心\",\"cultural_note\":\"源自希腊语 psithuros（低语/诽谤），英语中也借用了这个词形。\"},{\"word\":\"Uitwaaien\",\"language\":\"荷兰语\",\"pronunciation\":\"/ˈœytˌʋaːjə(n)/\",\"literal_meaning\":\"出去吹风\",\"chinese_explanation\":\"在刮风天出去散步，特别是在自然环境中（公园、海边），让风吹走脑中的杂念，清空思绪、焕然一新。\",\"english_approximation\":\"to go out in windy weather to clear one's mind\",\"emotion_tags\":[\"放松\",\"自然\",\"疗愈\",\"清空\"],\"usage_scenario\":\"工作压力大时去海边吹风，感觉整个人都被重置了。\",\"user_search_description\":\"心情不好的时候去外面吹风散步，让风把脑子里的乱七八糟都吹走\",\"cultural_note\":\"荷兰是一个多风的国家，uitwaaien 是将自然环境融入心理健康的典型代表。\"},{\"word\":\"Fernweh\",\"language\":\"德语\",\"pronunciation\":\"/ˈfɛʁnˌveː/\",\"literal_meaning\":\"远痛\",\"chinese_explanation\":\"对一个从未去过的地方产生的一种类似乡愁的渴望——\\\"远方之痛\\\"，想要去未知的远方。\",\"english_approximation\":\"wanderlust, farsickness\",\"emotion_tags\":[\"旅行\",\"渴望\",\"远方\",\"探索\"],\"usage_scenario\":\"看到旅行照片时心里痒痒、对未知世界充满渴望。\",\"user_search_description\":\"没去过那个地方但就是想得不行，像想家一样想远方\",\"cultural_note\":\"fern（远）+ Weh（痛），是 Heimweh（想家）的反面。\"},{\"word\":\"Kaamos\",\"language\":\"芬兰语\",\"pronunciation\":\"/ˈkɑːmos/\",\"literal_meaning\":\"极夜\",\"chinese_explanation\":\"不只是连续 24 小时没有阳光的极夜现象——更描述那种对阳光的渴望、伴随而来的抑郁感、缺乏动力和灵感枯竭的状态。\",\"english_approximation\":\"Polar Night, longing for sunshine, winter depression\",\"emotion_tags\":[\"抑郁\",\"渴望\",\"冬季\",\"黑暗\",\"乏力\"],\"usage_scenario\":\"芬兰北部冬季的漫漫长夜、整个人消沉无力只想睡觉的日子。\",\"user_search_description\":\"不是因为有什么事不开心，就是冬天没太阳整个人都蔫了、什么都不想干\",\"cultural_note\":\"芬兰北部每年有长达数周的极夜，kaamos 不仅是气象词，更是一个心理状态词。\"},{\"word\":\"Lieko\",\"language\":\"芬兰语\",\"pronunciation\":\"/ˈlieko/\",\"literal_meaning\":\"沉入湖底的树干\",\"chinese_explanation\":\"一棵已经沉入湖底的树干——一种沉默的、被遗忘的自然存在。\",\"english_approximation\":\"submerged tree trunk\",\"emotion_tags\":[\"自然\",\"寂静\",\"时间\",\"孤独\"],\"usage_scenario\":\"在芬兰的湖泊中看到水底的枯木。\",\"user_search_description\":\"静静地躺在湖底的一棵树干，好像时间在它身上停止了\",\"cultural_note\":\"芬兰是千湖之国，lieko 承载着一种北欧特有的沉静美学。\"},{\"word\":\"Tokka\",\"language\":\"芬兰语\",\"pronunciation\":\"/ˈtokːɑ/\",\"literal_meaning\":\"大群驯鹿\",\"chinese_explanation\":\"芬兰语中专门用来描述一大群驯鹿的集合名词。\",\"english_approximation\":\"large herd of reindeer\",\"emotion_tags\":[\"自然\",\"北方\",\"驯鹿\",\"壮观\"],\"usage_scenario\":\"在拉普兰看到成百上千头驯鹿迁徙。\",\"user_search_description\":\"一大群驯鹿在一起的壮观景象，有一个专门的词来形容\",\"cultural_note\":\"据说芬兰的驯鹿数量和人口数量相当。\"},{\"word\":\"Dalalæða\",\"language\":\"冰岛语\",\"pronunciation\":\"/ˈtaːlaˌlaiːða/\",\"literal_meaning\":\"山谷偷溜者\",\"chinese_explanation\":\"温暖晴天后从谷底升起的齐腰低雾——像一个悄悄爬上山谷的入侵者。\",\"english_approximation\":\"low valley fog that sneaks up after a warm day\",\"emotion_tags\":[\"自然\",\"雾\",\"冰岛\",\"神秘\"],\"usage_scenario\":\"冰岛山谷间那种缓缓升起的薄雾。\",\"user_search_description\":\"晴天之后山谷里悄悄爬上来的一层薄雾\",\"cultural_note\":\"冰岛语的\\\"天气词汇\\\"极其丰富，每种自然现象几乎都有独立命名。\"},{\"word\":\"Gluggaveður\",\"language\":\"冰岛语\",\"pronunciation\":\"/ˈklʏkːaˌvɛːðʏr/\",\"literal_meaning\":\"窗户天气\",\"chinese_explanation\":\"从窗户里看出去天气好极了的好、但一出门就冻得发抖的那种\\\"骗子天气\\\"。\",\"english_approximation\":\"weather that looks nice from the window but is actually cold\",\"emotion_tags\":[\"欺骗\",\"寒冷\",\"天气\",\"冰岛\"],\"usage_scenario\":\"透过窗户看到阳光明媚，一出门被冰岛的冷风打脸。\",\"user_search_description\":\"从窗户看出去感觉好暖和好想出门，一出去就被冻傻了\",\"cultural_note\":\"gluggi（窗户）+ veður（天气），冰岛人最熟悉的被骗体验。\"},{\"word\":\"Soare cu Dinti\",\"language\":\"罗马尼亚语\",\"pronunciation\":\"/ˈso̯are ku dintsʲ/\",\"literal_meaning\":\"有牙齿的太阳\",\"chinese_explanation\":\"一个阳光明媚、但冷得刺骨的天气——太阳看起来热情，实际像长了牙齿一样咬人。\",\"english_approximation\":\"sunny but bitterly cold weather\",\"emotion_tags\":[\"寒冷\",\"错觉\",\"天气\",\"幽默\"],\"usage_scenario\":\"冬天晴天出门以为暖和结果冻得要命。\",\"user_search_description\":\"太阳明晃晃的以为很暖和，一出去冷得像被太阳咬了一口\",\"cultural_note\":\"和冰岛语的 gluggaveður 异曲同工。\"},{\"word\":\"Listopad\",\"language\":\"俄语\",\"pronunciation\":\"/lʲɪstɐˈpat/\",\"literal_meaning\":\"落叶\",\"chinese_explanation\":\"树叶从树上飘落的自然现象——俄语将\\\"叶落\\\"独立成一个词。\",\"english_approximation\":\"the falling of leaves\",\"emotion_tags\":[\"秋天\",\"自然\",\"季节\"],\"usage_scenario\":\"描述秋天的落叶景象。\",\"user_search_description\":\"秋天树叶一片一片往下落的那种景象\",\"cultural_note\":\"list（叶子）+ pad（落下），俄语构词的简洁之美。\"},{\"word\":\"Yr\",\"language\":\"挪威语\",\"pronunciation\":\"/yːr/\",\"literal_meaning\":\"微小的雨\",\"chinese_explanation\":\"一种非常特殊的降雨——极小的、几乎漂浮在空中的雨滴（或雪花），介于毛毛雨和雾之间。\",\"english_approximation\":\"misty drizzle with tiny floating droplets\",\"emotion_tags\":[\"自然\",\"雨水\",\"挪威\",\"峡湾\"],\"usage_scenario\":\"挪威峡湾中那种像雾一样的细雨。\",\"user_search_description\":\"像雾气一样飘在空中、打不湿衣服但到处都是的那种超级细的雨\",\"cultural_note\":\"一位挪威人描述说：\\\"它不仅在拼写上是一幅画，读出来的时候更像一种声音而非文字。\"},{\"word\":\"Hanyauku\",\"language\":\"鲁克旺加利语（纳米比亚）\",\"pronunciation\":\"/haɲauku/\",\"literal_meaning\":\"踮脚走沙地\",\"chinese_explanation\":\"在滚烫的沙地上踮起脚尖走路的动作。\",\"english_approximation\":\"tiptoeing across hot sand\",\"emotion_tags\":[\"热\",\"身体\",\"自然\",\"非洲\"],\"usage_scenario\":\"在纳米比亚沙漠中午时分赤脚过沙地。\",\"user_search_description\":\"沙地被晒得滚烫，只能踮着脚飞快地跑过去的那种动作\",\"cultural_note\":\"非洲原住民语言对身体与自然环境互动的细致刻画。\"},{\"word\":\"Myötähäpeä\",\"language\":\"芬兰语\",\"pronunciation\":\"/ˈmyøtæˌhæpeæ/\",\"literal_meaning\":\"共同羞耻\",\"chinese_explanation\":\"看到别人做蠢事或出丑时自己也感到尴尬和羞耻——一种\\\"替别人尴尬\\\"的共情型不适。\",\"english_approximation\":\"secondhand embarrassment, vicarious shame\",\"emotion_tags\":[\"尴尬\",\"共情\",\"社交不适\",\"替人害臊\"],\"usage_scenario\":\"看尴尬的才艺表演、朋友在公共场合做奇怪的举动。\",\"user_search_description\":\"看到别人出丑自己也跟着脸红心跳、恨不得找个地缝钻进去\",\"cultural_note\":\"myö- 表示\\\"我们/共同\\\"，häpeä 是\\\"羞耻\\\"，字面就是\\\"我们一起丢脸\\\"。\"},{\"word\":\"Pena ajena\",\"language\":\"西班牙语\",\"pronunciation\":\"/ˈpena aˈxena/\",\"literal_meaning\":\"别人的羞耻\",\"chinese_explanation\":\"看到别人尴尬出丑时自己也感到的那种尴尬和不适——替别人社死。\",\"english_approximation\":\"vicarious embarrassment, secondhand embarrassment\",\"emotion_tags\":[\"尴尬\",\"共情\",\"社死\",\"社交\"],\"usage_scenario\":\"看到同事在台上讲了一个完全不好笑的笑话——你想找个地缝钻进去。\",\"user_search_description\":\"看到别人出丑自己比当事人还尴尬——想帮他找个地缝钻进去\",\"cultural_note\":\"与芬兰语 myötähäpeä 几乎完全对应。\"},{\"word\":\"Tartle\",\"language\":\"苏格兰语\",\"pronunciation\":\"/ˈtɑːrtəl/\",\"literal_meaning\":\"忘名瞬间\",\"chinese_explanation\":\"介绍别人时突然忘了对方名字的那个尴尬瞬间——\\\"这位是……呃……\\\"。\",\"english_approximation\":\"the hesitation when you've forgotten someone's name\",\"emotion_tags\":[\"尴尬\",\"健忘\",\"社交\",\"慌张\"],\"usage_scenario\":\"在派对上要给两个人互相介绍时突然脑海中一片空白。\",\"user_search_description\":\"要给两个人介绍的时候突然想不起名字了——那个'这位是…呃…'的尴尬瞬间\",\"cultural_note\":\"你可以说 \\\"Pardon my tartle!\\\"（抱歉，我 tartle 了！）\"},{\"word\":\"Mokita\",\"language\":\"基维拉语（Kivila，巴布亚新几内亚）\",\"pronunciation\":\"/moˈkita/\",\"literal_meaning\":\"大家都知道但没人说的真相\",\"chinese_explanation\":\"一个房间里所有人都心知肚明但没有任何人愿意承认或谈论的真相——\\\"房间里的那头大象\\\"。\",\"english_approximation\":\"an unspoken truth everyone knows\",\"emotion_tags\":[\"沉默\",\"共识\",\"尴尬\",\"社交禁忌\"],\"usage_scenario\":\"一家人吃饭时谁都不提那个刚进监狱的亲戚。\",\"user_search_description\":\"所有人都知道是怎么回事，但谁都不说——屋里那头大象\",\"cultural_note\":\"来自巴布亚新几内亚原住民语言，高度概括了人类社交中的集体默契与回避。\"},{\"word\":\"Epibreren\",\"language\":\"荷兰语\",\"pronunciation\":\"/ˌepiˈbreːrə(n)/\",\"literal_meaning\":\"假装在做一件听起来很重要的事\",\"chinese_explanation\":\"在工作场合装出一副很忙很重要的样子，实际上在偷懒——一种精致的职场表演艺术。\",\"english_approximation\":\"to pretend to be busy doing something important\",\"emotion_tags\":[\"偷懒\",\"职场\",\"幽默\",\"伪装\"],\"usage_scenario\":\"打开一堆表格做出一副在分析数据的样子，其实在看社交媒体。\",\"user_search_description\":\"表面上忙得不可开交，其实什么都没干，演技满分\",\"cultural_note\":\"这个词由荷兰报纸专栏作家 Simon Carmiggelt 创造——一位公务员为了打发他的问询而临时编了这个词。\"},{\"word\":\"Attaccabottoni\",\"language\":\"意大利语\",\"pronunciation\":\"/atˌtakkabotˈtoːni/\",\"literal_meaning\":\"钉扣子的人\",\"chinese_explanation\":\"一个话痨——像钉扣子一样揪住你不放，滔滔不绝地讲冗长而无意义的个人故事。\",\"english_approximation\":\"a chatty bore who corners you with long stories\",\"emotion_tags\":[\"话痨\",\"无聊\",\"社交窒息\"],\"usage_scenario\":\"在电梯里被邻居抓住讲了 20 分钟他的猫。\",\"user_search_description\":\"被一个话痨揪住不放、听他讲又长又没意思的故事——想逃都逃不掉\",\"cultural_note\":\"attaccare（贴/缝）+ bottoni（纽扣），意大利版的\\\"话唠钉子户\\\"。\"},{\"word\":\"Arigata-meiwaku\",\"language\":\"日语\",\"pronunciation\":\"/aɾiɡata meiwakɯ/\",\"literal_meaning\":\"感恩的麻烦\",\"chinese_explanation\":\"别人出于好意强行帮你做了一件你根本不想要的事，结果反而给你添了大麻烦——但出于社交礼仪你仍然必须表达感谢。\",\"english_approximation\":\"an unwanted favor that causes trouble, but you still have to express gratitude\",\"emotion_tags\":[\"尴尬\",\"无奈\",\"礼貌\",\"社交压力\",\"日本文化\"],\"usage_scenario\":\"朋友硬要帮你搬家结果打碎了你的花瓶。\",\"user_search_description\":\"别人硬是帮了你一个你不想被帮的忙，帮倒忙了你还要笑着说谢谢\",\"cultural_note\":\"高度概括了日本社交文化中\\\"好意与负担\\\"的张力。\"},{\"word\":\"Tatemae / Honne\",\"language\":\"日语\",\"pronunciation\":\"/tatemae/ /honne/\",\"literal_meaning\":\"建前 / 本音\",\"chinese_explanation\":\"Tatemae 是在公共场合表现出来的符合社会期望的行为/话语；Honne 是你内心真正想的但永远不会公开说的话。\",\"english_approximation\":\"public facade vs. true feelings\",\"emotion_tags\":[\"社交面具\",\"真实\",\"日本文化\",\"压抑\"],\"usage_scenario\":\"在工作会议上点头赞同但心里完全不认同——点头是 tatemae，心里话是 honne。\",\"user_search_description\":\"嘴上说着'好的没问题'，心里其实完全不是这么想的\",\"cultural_note\":\"理解日本社会运作方式的基本概念之一。\"},{\"word\":\"Dapjeongneo\",\"language\":\"韩语\",\"pronunciation\":\"/tap̚t͈ɕʌŋnʌ/\",\"literal_meaning\":\"答定你\",\"chinese_explanation\":\"对方已经预设了想要的答案，所以你只能说 ta 想听的话——即使你内心深处并不这么认为。类似\\\"善意的谎言\\\"但带有更多被动和无奈。\",\"english_approximation\":\"telling someone what they want to hear\",\"emotion_tags\":[\"无奈\",\"讨好\",\"社交压力\",\"韩国职场\"],\"usage_scenario\":\"老板问你\\\"我这个主意好吧？\\\"——你只能说\\\"当然好啊\\\"。\",\"user_search_description\":\"明知道对方想听什么答案，就顺着说——不是真心的但没办法\",\"cultural_note\":\"韩语中 dap（答）+ jeong（定）+ neo（你），韩国社会权力关系的缩影。\"},{\"word\":\"Fisselig\",\"language\":\"德语\",\"pronunciation\":\"/ˈfɪsəlɪç/\",\"literal_meaning\":\"被唠叨到慌\",\"chinese_explanation\":\"被别人不断唠叨或施加压力后变得手忙脚乱、慌到什么都做不好的状态。\",\"english_approximation\":\"flustered to the point of incompetence\",\"emotion_tags\":[\"慌乱\",\"压力\",\"无能感\",\"社交\"],\"usage_scenario\":\"有人在旁边一直说你做错了，你越紧张越出错。\",\"user_search_description\":\"别人越催越说你不行，你就越慌越做不好\",\"cultural_note\":\"德语\\\"被唠叨到不会干活\\\"的精确命名。\"},{\"word\":\"Schilderwald\",\"language\":\"德语\",\"pronunciation\":\"/ˈʃɪldɐˌvalt/\",\"literal_meaning\":\"路牌森林\",\"chinese_explanation\":\"一条被密密麻麻的路牌和交通标志搞得像森林一样的街道——指示牌多到让你反倒更容易迷路。\",\"english_approximation\":\"forest of street signs\",\"emotion_tags\":[\"混乱\",\"迷路\",\"官僚\",\"幽默\"],\"usage_scenario\":\"在标志过多的路口完全不知道该看哪一个。\",\"user_search_description\":\"路牌多到像森林一样，根本不知道该看哪个，反而更容易走错\",\"cultural_note\":\"Schild（路牌）+ Wald（森林），形容德国过度管理的交通系统。\"},{\"word\":\"Extrawunsch\",\"language\":\"德语\",\"pronunciation\":\"/ˈɛkstʁaˌvʊnʃ/\",\"literal_meaning\":\"额外要求\",\"chinese_explanation\":\"用来形容一个特别挑剔、爱找麻烦的人——总是有特殊要求，把事情搞复杂，拖慢所有人的进度。\",\"english_approximation\":\"fussy person, picky complainer\",\"emotion_tags\":[\"挑剔\",\"麻烦\",\"社交\",\"无奈\"],\"usage_scenario\":\"点菜时有一长串特殊要求的人、团队里那个总是打乱计划的成员。\",\"user_search_description\":\"什么事到他那儿都有额外的特殊要求，把简单的事搞复杂\",\"cultural_note\":\"Extra（额外的）+ Wunsch（愿望），字面上无害但使用时常带讽刺。\"},{\"word\":\"Tidsoptimist\",\"language\":\"瑞典语\",\"pronunciation\":\"/ˈtiːdsɔptɪˌmɪst/\",\"literal_meaning\":\"时间乐观主义者\",\"chinese_explanation\":\"一个总是迟到的人——因为他们对自己有多少时间抱有不切实际的乐观态度。\",\"english_approximation\":\"time optimist, someone who is always late\",\"emotion_tags\":[\"迟到\",\"乐观\",\"拖延\",\"自嘲\"],\"usage_scenario\":\"那个每次都以为 10 分钟能到结果花了 30 分钟的朋友。\",\"user_search_description\":\"每次都说'马上到'，结果半个小时以后才出现——永远高估自己的速度\",\"cultural_note\":\"tid（时间）+ optimist（乐观主义者），瑞典式的温柔吐槽。\"},{\"word\":\"Gilchi\",\"language\":\"韩语\",\"pronunciation\":\"/kiltɕʰi/\",\"literal_meaning\":\"路痴\",\"chinese_explanation\":\"一个方向感极差、出门必迷路的人。\",\"english_approximation\":\"someone with terrible sense of direction\",\"emotion_tags\":[\"迷路\",\"方向感\",\"搞笑\",\"日常\"],\"usage_scenario\":\"那个跟着导航都能走丢的朋友。\",\"user_search_description\":\"走哪丢哪、有导航也找不到路的那种路痴\",\"cultural_note\":\"韩语中 gil（路）+ chi（痴），和中文\\\"路痴\\\"几乎对应。\"},{\"word\":\"Ikigai\",\"language\":\"日语\",\"pronunciation\":\"/ikiɡai/\",\"literal_meaning\":\"生存的理由\",\"chinese_explanation\":\"让你每天早晨愿意起床的原因——你的生命目的、活着的意义。可以大到伟大使命，也可以小到每天早上的一杯好咖啡。\",\"english_approximation\":\"reason for being, life purpose\",\"emotion_tags\":[\"意义\",\"目的\",\"生命\",\"幸福\",\"日本哲学\"],\"usage_scenario\":\"找到真正热爱的事业、发现生活中让自己满足的小仪式。\",\"user_search_description\":\"不是赚钱养家的理由，而是让你每天早上愿意睁开眼睛的那个更深的东西\",\"cultural_note\":\"已经成为全球流行的人生哲学概念。\"},{\"word\":\"Mono no aware\",\"language\":\"日语\",\"pronunciation\":\"/mono no aɰaɾe/\",\"literal_meaning\":\"物之哀\",\"chinese_explanation\":\"对万物无常的温柔哀伤——看到樱花飘落时的感动，不是因为花美，而是因为它会谢。一种对\\\"一切都会消逝\\\"的深刻敏感。\",\"english_approximation\":\"the pathos of things, empathy toward impermanence\",\"emotion_tags\":[\"无常\",\"哀伤\",\"美感\",\"日本美学\"],\"usage_scenario\":\"看樱花、观落叶、意识到美好事物的短暂性时。\",\"user_search_description\":\"看到樱花落下来的时候心里那种淡淡的忧伤——不是难过，而是觉得'正因为会谢才美'\",\"cultural_note\":\"18 世纪学者本居宣长提出的日本美学核心概念。\"},{\"word\":\"Yūgen\",\"language\":\"日语\",\"pronunciation\":\"/juːɡen/\",\"literal_meaning\":\"幽玄\",\"chinese_explanation\":\"一种深刻而神秘的、超越了语言可以描述的宇宙之美与悲伤——看到远山被薄雾笼罩时心中涌起的那种不可言说的感受。\",\"english_approximation\":\"profound, mysterious sense of the beauty of the universe\",\"emotion_tags\":[\"幽美\",\"神秘\",\"宇宙\",\"日本美学\"],\"usage_scenario\":\"站在富士山脚下感受到的那种超越了\\\"美\\\"的深邃触动。\",\"user_search_description\":\"看到的不是普通的美，而是一种深不可测的、让人说不出话来的宇宙般的幽深之美\",\"cultural_note\":\"日本传统美学的核心概念之一，与 wabi-sabi 和 mono no aware 并称。\"},{\"word\":\"Shouganai\",\"language\":\"日语\",\"pronunciation\":\"/ɕoːɡanai/\",\"literal_meaning\":\"没办法\",\"chinese_explanation\":\"一种\\\"这件事无法控制，所以也没必要为它烦恼\\\"的接受哲学——不纠结于不可改变的事。\",\"english_approximation\":\"it can't be helped, accept and move on\",\"emotion_tags\":[\"接受\",\"淡然\",\"日本哲学\"],\"usage_scenario\":\"面对自然灾害、不可抗力或无力改变的局面时。\",\"user_search_description\":\"这件事已经没办法改变了，那就别想了——该怎样就怎样吧\",\"cultural_note\":\"体现了日本人的\\\"顺应\\\"和\\\"接受\\\"文化价值观。\"},{\"word\":\"Kaizen\",\"language\":\"日语\",\"pronunciation\":\"/kaizen/\",\"literal_meaning\":\"改善\",\"chinese_explanation\":\"一种\\\"持续小步改进\\\"的方法论和哲学——不追求一次性大变革，而是每天改善一点点，累积成巨大进步。\",\"english_approximation\":\"continuous improvement\",\"emotion_tags\":[\"进步\",\"坚持\",\"务实\",\"日本方法\"],\"usage_scenario\":\"每天学一个单词、每次工作流程优化一小步。\",\"user_search_description\":\"不贪多、不求快，每天做一点点进步，日积月累慢慢变好\",\"cultural_note\":\"丰田生产系统的核心理念，现已广泛应用于全球管理和个人成长。\"},{\"word\":\"Weltschmerz\",\"language\":\"德语\",\"pronunciation\":\"/ˈvɛltˌʃmɛʁts/\",\"literal_meaning\":\"世界之痛\",\"chinese_explanation\":\"对这个不完美的世界的深切悲伤——不是因为个人遭遇了什么，而是因为世界本身充满了不公、痛苦和缺陷而感到哀伤。\",\"english_approximation\":\"world-weariness, world-pain\",\"emotion_tags\":[\"悲伤\",\"理想主义\",\"世界\",\"存在感\"],\"usage_scenario\":\"看新闻时对人类的行为感到绝望、对世界的苦难感同身受。\",\"user_search_description\":\"不是因为自己遇到了什么事，而是觉得这个世界这么不完美，心里有一种说不出的悲哀\",\"cultural_note\":\"由德国作家让·保罗（Jean Paul）首创，后成为浪漫主义文学的核心概念。\"},{\"word\":\"Torschlusspanik\",\"language\":\"德语\",\"pronunciation\":\"/ˈtoːɐ̯ʃlʊsˌpaːnɪk/\",\"literal_meaning\":\"关门恐慌\",\"chinese_explanation\":\"随着年龄增长，感到一扇扇机会之门正在关闭，时间不多了——那种\\\"我这辈子是不是就这样了\\\"的焦虑感。\",\"english_approximation\":\"fear that time is running out, gate-closing panic\",\"emotion_tags\":[\"焦虑\",\"时间\",\"中年危机\",\"存在感\"],\"usage_scenario\":\"30 岁还没结婚的焦虑、40 岁还一事无成的恐慌。\",\"user_search_description\":\"感觉时间过得太快，所有机会像一一扇扇关上的门，来不及了\",\"cultural_note\":\"Tor（门）+ Schluss（关闭）+ Panik（恐慌），德语中年危机的精确命名。\"},{\"word\":\"Lebensmüde\",\"language\":\"德语\",\"pronunciation\":\"/ˈleːbn̩sˌmyːdə/\",\"literal_meaning\":\"活累了的\",\"chinese_explanation\":\"对生活感到疲惫和厌倦——不是临床意义上的抑郁，而是一种深层的\\\"活够了\\\"的虚无感。\",\"english_approximation\":\"world-weary, tired of life\",\"emotion_tags\":[\"疲惫\",\"虚无\",\"厌倦\",\"存在感\"],\"usage_scenario\":\"在重复的日常中感到一切都没有意义时的状态。\",\"user_search_description\":\"不是想死，但就是活得好累、对什么都提不起兴趣\",\"cultural_note\":\"Leben（生活/生命）+ müde（疲惫），德语直白而沉重的风格。\"},{\"word\":\"Toska\",\"language\":\"俄语\",\"pronunciation\":\"/tɐsˈka/\",\"literal_meaning\":\"无尽的忧伤\",\"chinese_explanation\":\"一种没有具体原因的、深及灵魂的痛苦、悲伤或忧郁——不是抑郁，而是一种精神层面的广阔空寂。\",\"english_approximation\":\"deep spiritual anguish, melancholia without cause\",\"emotion_tags\":[\"悲伤\",\"空寂\",\"灵魂\",\"俄罗斯\"],\"usage_scenario\":\"在俄罗斯的茫茫雪原上感到的那种灵魂深处的空寂。\",\"user_search_description\":\"不是因为什么事难过，就是一种说不清的、从灵魂深处涌出来的忧伤和空旷\",\"cultural_note\":\"被许多人认为是最能代表俄罗斯灵魂的词汇之一。\"},{\"word\":\"Sisu\",\"language\":\"芬兰语\",\"pronunciation\":\"/ˈsisu/\",\"literal_meaning\":\"内在力量\",\"chinese_explanation\":\"一种斯多葛式的坚韧——在极端困难面前不退缩、不放弃，以理性面对逆境。不是一时的勇气，而是持续到底的力量。\",\"english_approximation\":\"stoic determination, grit, resilience\",\"emotion_tags\":[\"坚韧\",\"毅力\",\"勇气\",\"逆境\",\"芬兰精神\"],\"usage_scenario\":\"在寒冬中继续前行、面对几乎不可能完成的任务仍然坚持到底。\",\"user_search_description\":\"明明已经到极限了，但就是咬牙坚持不放弃的那种骨子里的劲儿\",\"cultural_note\":\"芬兰人认为 sisu 是民族性格的核心——在零下 30 度的极寒中生存下来的意志力。\"},{\"word\":\"Þetta reddast\",\"language\":\"冰岛语\",\"pronunciation\":\"/ˈθɛhta ˈrɛtːast/\",\"literal_meaning\":\"一切都会好的\",\"chinese_explanation\":\"冰岛的非官方座右铭——\\\"事情最终会解决的\\\"。一种面对困难的淡定哲学。\",\"english_approximation\":\"everything will work out in the end\",\"emotion_tags\":[\"乐观\",\"淡定\",\"冰岛精神\",\"韧劲\"],\"usage_scenario\":\"面对任何危机或不确定性时的冰岛式回应。\",\"user_search_description\":\"不管现在多糟糕，一切到最后都会好起来的\",\"cultural_note\":\"冰岛人用这句话面对火山爆发、经济危机和一切生活中的不确定性。\"},{\"word\":\"Litost\",\"language\":\"捷克语\",\"pronunciation\":\"/ˈlɪtost/\",\"literal_meaning\":\"因看到自己的悲惨而产生的痛苦\",\"chinese_explanation\":\"米兰·昆德拉将其定义为\\\"突然意识到自身可怜处境时产生的一种折磨\\\"——一种混合了自怜、羞愧和报复欲的心理状态。\",\"english_approximation\":\"state of torment at the sight of one's own misery\",\"emotion_tags\":[\"自怜\",\"羞愧\",\"痛苦\",\"报复欲\",\"存在感\"],\"usage_scenario\":\"被拒绝后感到自己的卑微，既痛苦又愤怒，想要报复但又更觉得自己可怜。\",\"user_search_description\":\"突然意识到自己好可怜，又难过又羞耻又想发脾气的那种纠结的痛\",\"cultural_note\":\"昆德拉在《笑忘录》中对此词有深刻分析——litost 是捷克灵魂的独特回响。\"},{\"word\":\"Jijivisha\",\"language\":\"印地语\",\"pronunciation\":\"/dʒiːdʒiːˈviːʃaː/\",\"literal_meaning\":\"对生命的强烈渴望\",\"chinese_explanation\":\"一种强烈的、想要把生命活得淋漓尽致的欲望——不满足于庸碌度日，而是充满激情和渴望地投入生活。\",\"english_approximation\":\"intense desire to live life to the fullest\",\"emotion_tags\":[\"生命热情\",\"渴望\",\"活力\",\"存在感\"],\"usage_scenario\":\"一个人辞去安稳工作去环游世界、在绝境中仍然热爱生命。\",\"user_search_description\":\"不只是活着，而是每一天都想要活到极致的那种热情\",\"cultural_note\":\"源自梵语，带有一种近乎宗教性的生命热情。\"},{\"word\":\"Filotimo\",\"language\":\"希腊语\",\"pronunciation\":\"/fiˈlotimo/\",\"literal_meaning\":\"爱荣誉\",\"chinese_explanation\":\"一种近乎无法翻译的道德概念——一个理解自己作为人的责任、无论付出什么代价都会做正确的事、保持荣誉的人。即使面对财富、安全、自由甚至生命的威胁。\",\"english_approximation\":\"love of honour, sense of duty\",\"emotion_tags\":[\"荣誉\",\"责任\",\"道德\",\"希腊文化\"],\"usage_scenario\":\"一个在极端困境中仍然选择做正确事情的人。\",\"user_search_description\":\"不管付出什么代价都要做对的事——那种骨子里的荣誉感\",\"cultural_note\":\"被许多希腊人认为是\\\"希腊精神\\\"的核心。\"},{\"word\":\"Hyo\",\"language\":\"韩语\",\"pronunciation\":\"/hjo/\",\"literal_meaning\":\"孝\",\"chinese_explanation\":\"子女对父母的责任感和牺牲精神——一种深植于儒家文化中的道德义务。\",\"english_approximation\":\"filial piety, sense of duty to parents\",\"emotion_tags\":[\"责任\",\"孝顺\",\"家庭\",\"儒家文化\"],\"usage_scenario\":\"为了照顾年迈父母而放弃自己事业选择的决定。\",\"user_search_description\":\"对父母的那种不是出于爱、而是出于责任和感恩的照顾之心\",\"cultural_note\":\"与中文\\\"孝\\\"同源，但韩语中的 hyo 带有更强的社会期望和压力。\"},{\"word\":\"Abbiocco\",\"language\":\"意大利语（罗马方言）\",\"pronunciation\":\"/abˈbjɔkːo/\",\"literal_meaning\":\"饭后困\",\"chinese_explanation\":\"吃完一大顿饭后袭来的睡意——碳水化合物导致的\\\"昏睡魔咒\\\"。\",\"english_approximation\":\"food coma, post-meal drowsiness\",\"emotion_tags\":[\"食物\",\"困倦\",\"满足\",\"碳水昏迷\"],\"usage_scenario\":\"吃完意大利面午餐后完全不想动的那种困意。\",\"user_search_description\":\"吃饱喝足之后整个人瘫在那儿什么都不想干的那种昏昏欲睡\",\"cultural_note\":\"罗马方言特有的词汇，体现了意大利饮食文化的深度。\"},{\"word\":\"Culaccino\",\"language\":\"意大利语\",\"pronunciation\":\"/kulatˈtʃiːno/\",\"literal_meaning\":\"杯底残渣\",\"chinese_explanation\":\"一个冷饮水杯在桌面上留下的那个湿漉漉的水印圈——也指杯底剩下的最后一点残渣。\",\"english_approximation\":\"water ring left by a cold glass\",\"emotion_tags\":[\"日常\",\"细节\",\"痕迹\"],\"usage_scenario\":\"喝水时杯子在木桌上留下的那个圈。\",\"user_search_description\":\"放在木桌上的冰水杯留下的那个水印圈\",\"cultural_note\":\"culo 在意大利语中是\\\"底部\\\"的意思，culaccino 就是\\\"底部的小东西\\\"。\"},{\"word\":\"Hyppytyynytyydytys\",\"language\":\"芬兰语\",\"pronunciation\":\"/ˈhypːyˌtyːnyˌtyːdytys/\",\"literal_meaning\":\"弹跳垫满足感\",\"chinese_explanation\":\"坐在或跳在一个有弹性的垫子上时感受到的那种满足和愉悦——一种纯粹的身体快感。\",\"english_approximation\":\"bouncy cushion satisfaction\",\"emotion_tags\":[\"快乐\",\"童趣\",\"身体感\",\"纯粹愉悦\"],\"usage_scenario\":\"跳上蹦床、坐在弹力球上、小朋友在充气城堡里跳。\",\"user_search_description\":\"坐在有弹性的东西上弹来弹去时那种莫名其妙的满足感\",\"cultural_note\":\"这个词的长度本身就是一种幽默——芬兰人甚至为\\\"弹跳的快乐\\\"发明了一个单词。\"},{\"word\":\"Jaksaa\",\"language\":\"芬兰语\",\"pronunciation\":\"/ˈjɑksɑː/\",\"literal_meaning\":\"没有力气/意愿\",\"chinese_explanation\":\"严重缺乏做某事的热情和精力——不是不能做，而是真的懒得动、提不起劲。\",\"english_approximation\":\"to lack energy or willpower to do something\",\"emotion_tags\":[\"疲惫\",\"倦怠\",\"缺乏动力\"],\"usage_scenario\":\"冬天的早晨不想起床、面对一堆家务完全不想动手。\",\"user_search_description\":\"不是不会做也不是做不了，就是完全提不起那个劲来做\",\"cultural_note\":\"芬兰漫长黑暗的冬天可能是 jaksaa 的高发季节。\"},{\"word\":\"Sauna\",\"language\":\"芬兰语\",\"pronunciation\":\"/ˈsɑunɑ/\",\"literal_meaning\":\"桑拿\",\"chinese_explanation\":\"芬兰人几千年前发明的一种蒸汽浴室，至今仍是芬兰文化的基石。传统上，芬兰人搬家时先建桑拿房，再建住宅。\",\"english_approximation\":\"sauna (borrowed directly)\",\"emotion_tags\":[\"洁净\",\"放松\",\"仪式\",\"芬兰文化\",\"身体\"],\"usage_scenario\":\"芬兰人每周必做的桑拿仪式。\",\"user_search_description\":\"不只是洗澡，而是一种从身体到灵魂都被清洗干净的仪式感\",\"cultural_note\":\"桑拿是英语从芬兰语借用的极少数词汇之一。\"},{\"word\":\"Pana Po'o\",\"language\":\"夏威夷语\",\"pronunciation\":\"/ˈpana poʔo/\",\"literal_meaning\":\"挠头\",\"chinese_explanation\":\"为了努力想起某件已经忘记的事情而挠头的动作。\",\"english_approximation\":\"scratching your head to remember something\",\"emotion_tags\":[\"健忘\",\"思考\",\"身体语言\"],\"usage_scenario\":\"想不起把车钥匙放哪了时的那个挠头动作。\",\"user_search_description\":\"想不起来什么事的时候习惯性地挠头——希望挠着挠着就想起来了\",\"cultural_note\":\"夏威夷语把这个普通的身体动作变成了一个独立词汇。\"},{\"word\":\"Zhaghzhagh\",\"language\":\"波斯语\",\"pronunciation\":\"/ʒæɣʒæɣ/\",\"literal_meaning\":\"牙齿打颤\",\"chinese_explanation\":\"因为极度寒冷或极度愤怒而导致牙齿失控地打颤——那个\\\"咯咯咯\\\"的声音。\",\"english_approximation\":\"uncontrollable chattering of teeth\",\"emotion_tags\":[\"寒冷\",\"愤怒\",\"身体反应\"],\"usage_scenario\":\"冬天没有暖气冷到牙齿发抖、愤怒到浑身哆嗦。\",\"user_search_description\":\"冷得牙齿咯咯咯地打颤，或者气到牙都在发抖\",\"cultural_note\":\"波斯语的拟声词，同时适用冷和怒两种极端状态。\"},{\"word\":\"Yaourt\",\"language\":\"法语\",\"pronunciation\":\"/jauʁt/\",\"literal_meaning\":\"酸奶\",\"chinese_explanation\":\"听到一首歌想跟着唱但不会歌词时，用含糊的嗓音和瞎编的音节来假装自己会唱——\\\"酸奶式\\\"跟唱。\",\"english_approximation\":\"to sing along using nonsense syllables\",\"emotion_tags\":[\"快乐\",\"幽默\",\"音乐\",\"假装\"],\"usage_scenario\":\"听外文歌时跟着乱哼、卡拉 OK 时瞎编歌词。\",\"user_search_description\":\"听到喜欢的歌不会歌词也要跟着瞎哼一起唱\",\"cultural_note\":\"法国人管这种做法叫\\\"酸奶\\\"——大概是嘴巴里含着一口酸奶说话的感觉。\"},{\"word\":\"Age-otori\",\"language\":\"日语\",\"pronunciation\":\"/aɡeotoɾi/\",\"literal_meaning\":\"越理越糟\",\"chinese_explanation\":\"理完发之后看起来比之前更难看——一场灾难性的发型改变。\",\"english_approximation\":\"a haircut that makes you look worse\",\"emotion_tags\":[\"后悔\",\"发型\",\"灾难\",\"幽默\"],\"usage_scenario\":\"从理发店走出来看到镜子里自己时的绝望。\",\"user_search_description\":\"理完发发现自己比原来更难看了——这个发型毁了\",\"cultural_note\":\"age（上げ，提高/完成）+ otori（劣り，变差），日语自嘲系生活词的典型。\"},{\"word\":\"Hakuna matata\",\"language\":\"斯瓦希里语\",\"pronunciation\":\"/hɑˈkunɑ mɑˈtɑtɑ/\",\"literal_meaning\":\"没有烦恼\",\"chinese_explanation\":\"一种\\\"不要为无法控制的事情操心\\\"的生活哲学——一切都会好起来的。\",\"english_approximation\":\"no worries, no troubles\",\"emotion_tags\":[\"乐观\",\"放松\",\"非洲\",\"无忧\"],\"usage_scenario\":\"《狮子王》让这句话全球闻名，但在东非日常生活中也常用。\",\"user_search_description\":\"别想太多、别操心那些改不了的事情——一切都会好的\",\"cultural_note\":\"虽然在流行文化中被广泛使用，但东非人确实在日常生活中使用它。\"},{\"word\":\"Vobba / Vabba\",\"language\":\"瑞典语\",\"pronunciation\":\"/ˈvɔba/ /ˈvaba/\",\"literal_meaning\":\"在家带娃+工作\",\"chinese_explanation\":\"Vabba = 请假在家照顾生病的孩子。Vobba = 请假在家照顾孩子但仍然在处理工作（回邮件、接电话）。\",\"english_approximation\":\"to stay home from work to care for a sick child (while still working)\",\"emotion_tags\":[\"育儿\",\"工作\",\"平衡\",\"北欧福利\"],\"usage_scenario\":\"孩子发烧了你请假在家，一边陪孩子一边偷偷回工作消息。\",\"user_search_description\":\"孩子生病了请假在家，一边照顾孩子一边还要抽空处理工作上的事\",\"cultural_note\":\"vabba = vård av barn（照顾孩子），vobba = vabba + jobba（工作）的结合。\"},{\"word\":\"Harkla\",\"language\":\"瑞典语\",\"pronunciation\":\"/ˈharkla/\",\"literal_meaning\":\"清嗓子\",\"chinese_explanation\":\"在演讲或重要发言之前那一小声清喉咙的动作——\\\"咳嗯\\\"。\",\"english_approximation\":\"to clear one's throat\",\"emotion_tags\":[\"准备\",\"紧张\",\"发言\",\"仪式\"],\"usage_scenario\":\"上台发言前下意识地清了清嗓子。\",\"user_search_description\":\"准备开口说话之前那个'咳嗯'清了一下嗓子的瞬间\",\"cultural_note\":\"瑞典语把这个小动作变成了一个独立的动词。\"},{\"word\":\"Orka\",\"language\":\"瑞典语\",\"pronunciation\":\"/ˈɔrka/\",\"literal_meaning\":\"有精力\",\"chinese_explanation\":\"有精力做某事\\\"——一个用于表达能量水平的常用动词。\",\"english_approximation\":\"to have the energy\",\"emotion_tags\":[\"精力\",\"疲惫\",\"日常\"],\"usage_scenario\":\"我 orka 不去 gym 了今天\\\"——没劲儿了。\",\"user_search_description\":\"不是不想做而是真的没有那个力气了\",\"cultural_note\":\"Jag orkar inte\\\" = 我撑不住了。\"},{\"word\":\"Hinna\",\"language\":\"瑞典语\",\"pronunciation\":\"/ˈhɪna/\",\"literal_meaning\":\"来得及\",\"chinese_explanation\":\"赶得上\\\"、\\\"来得及\\\"、\\\"有时间做某事\\\"——一个描述时间把握能力的常用动词。\",\"english_approximation\":\"to be on time, to find the time\",\"emotion_tags\":[\"时间\",\"效率\",\"日常\"],\"usage_scenario\":\"我 hinna 赶上那趟车吗？\",\"user_search_description\":\"赶不赶得上、来不来得及——那种对时间刚刚好的把握\",\"cultural_note\":\"瑞典人日常生活中使用频率极高的动词。\"},{\"word\":\"Suilk\",\"language\":\"苏格兰语\",\"pronunciation\":\"/swɪlk/\",\"literal_meaning\":\"咕噜咕噜地喝\",\"chinese_explanation\":\"吞咽、饮入或吮吸时发出异常响亮的咕噜声。\",\"english_approximation\":\"to swallow or gulp noisily\",\"emotion_tags\":[\"声音\",\"饮食\",\"不雅\"],\"usage_scenario\":\"喝汤的时候发出呼噜呼噜的声音。\",\"user_search_description\":\"喝水或喝汤的时候嘴巴里发出那种咕噜咕噜的声音\",\"cultural_note\":\"这个词甚至产生了英语变形：suilking（做出这种行为的动作）和 suilker（做出这种行为的人）。\"},{\"word\":\"Faamiti\",\"language\":\"萨摩亚语\",\"pronunciation\":\"/faːˈmiti/\",\"literal_meaning\":\"嘬唇声\",\"chinese_explanation\":\"通过紧闭嘴唇快速吸气发出的尖锐声音——用来吸引宠物或小孩的注意。\",\"english_approximation\":\"high-pitched sound made by sucking air through pursed lips\",\"emotion_tags\":[\"呼唤\",\"宠物\",\"小孩\",\"身体技能\"],\"usage_scenario\":\"叫狗过来、逗小孩玩时发出的那种\\\"吱吱\\\"声。\",\"user_search_description\":\"用嘴唇发出那种尖尖的声音叫狗狗过来\",\"cultural_note\":\"太平洋岛国原住民语言中对手势和声音信号有大量专门词汇。\"},{\"word\":\"Chindōgu\",\"language\":\"日语\",\"pronunciation\":\"/tɕindoːɡɯ/\",\"literal_meaning\":\"珍道具\",\"chinese_explanation\":\"表面上看起来巧妙解决了某个日常问题、但实际上完全没用甚至更麻烦的\\\"发明\\\"——一种日本式的无用幽默。\",\"english_approximation\":\"useless gadget that seems ingenious\",\"emotion_tags\":[\"幽默\",\"无用\",\"发明\",\"日本\"],\"usage_scenario\":\"给鞋子加小伞、领带风扇等看似聪明实则添乱的发明。\",\"user_search_description\":\"看起来特别聪明解决了问题的发明，用了之后发现完全是个笑话\",\"cultural_note\":\"chin（珍/奇怪）+ dōgu（道具/工具），是日本特有的一种幽默文化。\"},{\"word\":\"Prozvonit\",\"language\":\"捷克语\",\"pronunciation\":\"/ˈprozvonɪt/\",\"literal_meaning\":\"响一声就挂\",\"chinese_explanation\":\"打电话只让它响一声就挂断，让对方打回来——省自己的电话费。\",\"english_approximation\":\"to drop-call, to let it ring once\",\"emotion_tags\":[\"省钱\",\"实用\",\"社交策略\"],\"usage_scenario\":\"在话费紧张的年代，响一声让对方回拨。\",\"user_search_description\":\"打电话响一声就挂掉，等对方打回来，这样可以省话费\",\"cultural_note\":\"捷克人把这个常见的省钱技巧变成了一个动词。\"},{\"word\":\"İmece\",\"language\":\"土耳其语\",\"pronunciation\":\"\",\"literal_meaning\":\"\",\"chinese_explanation\":\"全村人聚在一起帮一个人干活\",\"english_approximation\":\"\",\"emotion_tags\":[],\"usage_scenario\":\"\",\"user_search_description\":\"全村人聚在一起帮一个人干活\",\"cultural_note\":\"\"},{\"word\":\"Fargin\",\"language\":\"意第绪语\",\"pronunciation\":\"\",\"literal_meaning\":\"\",\"chinese_explanation\":\"全心欣赏他人的成功\",\"english_approximation\":\"\",\"emotion_tags\":[],\"usage_scenario\":\"\",\"user_search_description\":\"全心欣赏他人的成功\",\"cultural_note\":\"\"},{\"word\":\"Startijenn\",\"language\":\"布列塔尼语\",\"pronunciation\":\"\",\"literal_meaning\":\"\",\"chinese_explanation\":\"能量激增 + 坚持不懈\",\"english_approximation\":\"\",\"emotion_tags\":[],\"usage_scenario\":\"\",\"user_search_description\":\"能量激增 + 坚持不懈\",\"cultural_note\":\"\"},{\"word\":\"Rokjesdag\",\"language\":\"荷兰语\",\"pronunciation\":\"\",\"literal_meaning\":\"\",\"chinese_explanation\":\"春天第一个暖和到能光腿穿裙子的日子\",\"english_approximation\":\"\",\"emotion_tags\":[],\"usage_scenario\":\"\",\"user_search_description\":\"春天第一个暖和到能光腿穿裙子的日子\",\"cultural_note\":\"\"},{\"word\":\"Solkatt\",\"language\":\"瑞典语\",\"pronunciation\":\"\",\"literal_meaning\":\"\",\"chinese_explanation\":\"手表反射到墙上的那一小片闪光\",\"english_approximation\":\"\",\"emotion_tags\":[],\"usage_scenario\":\"\",\"user_search_description\":\"手表反射到墙上的那一小片闪光\",\"cultural_note\":\"\"},{\"word\":\"Celístia\",\"language\":\"加泰罗尼亚语\",\"pronunciation\":\"\",\"literal_meaning\":\"\",\"chinese_explanation\":\"来自星辰的亮光\",\"english_approximation\":\"\",\"emotion_tags\":[],\"usage_scenario\":\"\",\"user_search_description\":\"来自星辰的亮光\",\"cultural_note\":\"\"},{\"word\":\"Resol\",\"language\":\"马略卡语\",\"pronunciation\":\"\",\"literal_meaning\":\"\",\"chinese_explanation\":\"云层后依然刺眼的阳光\",\"english_approximation\":\"\",\"emotion_tags\":[],\"usage_scenario\":\"\",\"user_search_description\":\"云层后依然刺眼的阳光\",\"cultural_note\":\"\"},{\"word\":\"Mbuki-mvuki\",\"language\":\"斯瓦希里语\",\"pronunciation\":\"\",\"literal_meaning\":\"\",\"chinese_explanation\":\"甩掉衣服自在地跳舞\",\"english_approximation\":\"\",\"emotion_tags\":[],\"usage_scenario\":\"\",\"user_search_description\":\"甩掉衣服自在地跳舞\",\"cultural_note\":\"\"},{\"word\":\"Bildung\",\"language\":\"德语\",\"pronunciation\":\"\",\"literal_meaning\":\"\",\"chinese_explanation\":\"教育+修养+文化养成（不可分割的整体概念）\",\"english_approximation\":\"\",\"emotion_tags\":[],\"usage_scenario\":\"\",\"user_search_description\":\"教育+修养+文化养成（不可分割的整体概念）\",\"cultural_note\":\"\"},{\"word\":\"Ta'arof\",\"language\":\"波斯语\",\"pronunciation\":\"\",\"literal_meaning\":\"\",\"chinese_explanation\":\"一套复杂的社交礼仪和谦让规则\",\"english_approximation\":\"\",\"emotion_tags\":[],\"usage_scenario\":\"\",\"user_search_description\":\"一套复杂的社交礼仪和谦让规则\",\"cultural_note\":\"\"},{\"word\":\"Anánkē\",\"language\":\"希腊语\",\"pronunciation\":\"\",\"literal_meaning\":\"\",\"chinese_explanation\":\"命运+必然性（比 fate 更重）\",\"english_approximation\":\"\",\"emotion_tags\":[],\"usage_scenario\":\"\",\"user_search_description\":\"命运+必然性（比 fate 更重）\",\"cultural_note\":\"\"},{\"word\":\"Gamchil\",\"language\":\"韩语\",\"pronunciation\":\"\",\"literal_meaning\":\"\",\"chinese_explanation\":\"融合了天、地、海三元素的极致鲜味\",\"english_approximation\":\"\",\"emotion_tags\":[],\"usage_scenario\":\"\",\"user_search_description\":\"融合了天、地、海三元素的极致鲜味\",\"cultural_note\":\"\"},{\"word\":\"Kataṟu\",\"language\":\"泰米尔语\",\"pronunciation\":\"\",\"literal_meaning\":\"\",\"chinese_explanation\":\"无助地颤抖着哭泣\",\"english_approximation\":\"\",\"emotion_tags\":[],\"usage_scenario\":\"\",\"user_search_description\":\"无助地颤抖着哭泣\",\"cultural_note\":\"\"},{\"word\":\"Moņ\",\"language\":\"巴什基尔语\",\"pronunciation\":\"\",\"literal_meaning\":\"\",\"chinese_explanation\":\"悲伤+旋律+抒情——三合一\",\"english_approximation\":\"\",\"emotion_tags\":[],\"usage_scenario\":\"\",\"user_search_description\":\"悲伤+旋律+抒情——三合一\",\"cultural_note\":\"\"},{\"word\":\"Yuputka\",\"language\":\"乌尔瓦语（Ulwa，尼加拉瓜原住民语言）\",\"pronunciation\":\"/juˈput.ka/\",\"literal_meaning\":\"皮肤上的幻触\",\"chinese_explanation\":\"在夜晚的树林中行走时，皮肤上感觉到的那种\\\"好像有什么东西在爬\\\"的幻觉——其实什么都没有，但你就是觉得有。\",\"english_approximation\":\"phantom sensation of something crawling on your skin\",\"emotion_tags\":[\"恐惧\",\"幻觉\",\"夜晚\",\"触觉\"],\"usage_scenario\":\"夜晚独自走在小路上总觉得有虫子在身上爬。\",\"user_search_description\":\"走夜路的时候总觉得有虫子在身上爬——其实什么都没有，但就是觉得有\",\"cultural_note\":\"\"},{\"word\":\"Xiao xiao\",\"language\":\"中文\",\"pronunciation\":\"\",\"literal_meaning\":\"\",\"chinese_explanation\":\"风雨潇潇的声音\",\"english_approximation\":\"\",\"emotion_tags\":[],\"usage_scenario\":\"\",\"user_search_description\":\"风雨潇潇的声音\",\"cultural_note\":\"\"},{\"word\":\"Ćeif\",\"language\":\"波斯尼亚语\",\"pronunciation\":\"\",\"literal_meaning\":\"\",\"chinese_explanation\":\"对某人或某事缓慢而沉默的享受\",\"english_approximation\":\"\",\"emotion_tags\":[],\"usage_scenario\":\"\",\"user_search_description\":\"对某人或某事缓慢而沉默的享受\",\"cultural_note\":\"\"},{\"word\":\"Loskop\",\"language\":\"南非荷兰语（Afrikaans）\",\"pronunciation\":\"/ˈlɔskɔp/\",\"literal_meaning\":\"松掉的脑袋\",\"chinese_explanation\":\"形容一个人健忘、心不在焉、有点迷糊，脑子里好像少根筋。\",\"english_approximation\":\"absent-minded, scatterbrained\",\"emotion_tags\":[\"健忘\",\"迷糊\",\"呆萌\",\"日常\"],\"usage_scenario\":\"形容朋友总是丢三落四、忘了约会时间。\",\"user_search_description\":\"总是丢三落四、老是忘记事情的那种迷糊状态\",\"cultural_note\":\"字面由 los（松）+ kop（头）组成。\"},{\"word\":\"Taarradhin\",\"language\":\"阿拉伯语\",\"pronunciation\":\"/taːˈraːdˤin/\",\"literal_meaning\":\"互相满意\",\"chinese_explanation\":\"达成一种让双方都保住面子的妥协——没人需要认输，但问题解决了。\",\"english_approximation\":\"win-win compromise, reconciliation without losing face\",\"emotion_tags\":[\"和解\",\"面子\",\"双赢\",\"社交智慧\"],\"usage_scenario\":\"商业谈判、家庭纠纷中找到一个谁也不丢脸的解决方案。\",\"user_search_description\":\"不是一方赢一方输，而是两边都有了台阶下、都不丢脸的解决方式\",\"cultural_note\":\"在中东文化中维护\\\"面子\\\"极为重要，这个词精确捕捉了这种社交需求。\"},{\"word\":\"Ghodar-dim\",\"language\":\"孟加拉语\",\"pronunciation\":\"/ɡʱoɽaɾ d̪im/\",\"literal_meaning\":\"马蛋\",\"chinese_explanation\":\"讽刺性地表达\\\"什么都没有\\\"或\\\"虚假的希望\\\"——就像马不会下蛋一样，这个东西根本不存在。\",\"english_approximation\":\"nothing, false hope, pie in the sky\",\"emotion_tags\":[\"讽刺\",\"失望\",\"幽默\",\"虚无\"],\"usage_scenario\":\"有人给你画了一个不可能实现的大饼时。\",\"user_search_description\":\"别人给你承诺了一个东西，但你知道那根本不存在，就像马会下蛋一样荒唐\",\"cultural_note\":\"孟加拉语中充满生动的动物比喻，\\\"马蛋\\\"是最具黑色幽默的一个。\"},{\"word\":\"Guanxi\",\"language\":\"中文（普通话）\",\"pronunciation\":\"/ɡwanɕi/（关系）\",\"literal_meaning\":\"关系\",\"chinese_explanation\":\"远超\\\"connections\\\"——它是一种建立在人情、互惠和义务之上的深度个人网络。有了关系，办事容易；欠了人情，迟早要还。关系一旦建立就是终身的循环。\",\"english_approximation\":\"connections, relationships, network\",\"emotion_tags\":[\"社交\",\"互惠\",\"人情\",\"网络\",\"中国文化\"],\"usage_scenario\":\"通过熟人介绍找工作、送礼维系商业关系、请人帮忙办事。\",\"user_search_description\":\"不是点头之交，而是那种有来有往、互相绑定的深层人际关系网\",\"cultural_note\":\"中国社会中\\\"关系\\\"是完成任何事情的基本操作方式之一。\"},{\"word\":\"Ré nao\",\"language\":\"中文（普通话）\",\"pronunciation\":\"/ɻɤ˥˩ nɑʊ˥˩/（热闹）\",\"literal_meaning\":\"热闹\",\"chinese_explanation\":\"不仅仅是\\\"热闹\\\"或\\\"人声鼎沸\\\"——它是一个地方充满活力、气氛诱人、让你不由自主想待下去的场域感。\",\"english_approximation\":\"lively, bustling, festive atmosphere\",\"emotion_tags\":[\"活力\",\"欢乐\",\"氛围\",\"社交\",\"节庆\"],\"usage_scenario\":\"春节庙会、夜市、婚礼现场的人声与欢笑声交织的场景。\",\"user_search_description\":\"一个地方人多、声音大、气氛好，让人感觉特别有烟火气的热闹劲儿\",\"cultural_note\":\"中国文化的\\\"热闹\\\"是积极的——安静反而可能意味着冷清和不幸。\"},{\"word\":\"Mít kliku\",\"language\":\"捷克语\",\"pronunciation\":\"/miːt ˈklɪku/\",\"literal_meaning\":\"有一个门把手\",\"chinese_explanation\":\"运气好、走运——就像刚好抓住了门把手，打开了那扇幸运之门。\",\"english_approximation\":\"to be lucky, to have luck on your side\",\"emotion_tags\":[\"幸运\",\"巧合\",\"日常幽默\"],\"usage_scenario\":\"最后一秒赶上车、刚好抽中奖时。\",\"user_search_description\":\"刚好走运，像抓住了一个门把手一样打开了机会之门\",\"cultural_note\":\"捷克语用\\\"门把手\\\"比喻运气的具象化非常有趣。\"},{\"word\":\"Gezelligheid\",\"language\":\"荷兰语\",\"pronunciation\":\"/ɣəˈzɛləxɦɛit/\",\"literal_meaning\":\"温馨感\",\"chinese_explanation\":\"gezellig 的名词形式——那种包围着你的温暖、亲密、舒适的氛围感。\",\"english_approximation\":\"coziness, togetherness, conviviality\",\"emotion_tags\":[\"温暖\",\"亲密\",\"舒适\",\"氛围\"],\"usage_scenario\":\"描述一个聚会或一个小咖啡馆的氛围。\",\"user_search_description\":\"不是说这个地方装修得好，而是走进来就觉得心里暖洋洋的，想待着不走\",\"cultural_note\":\"荷兰文化的核心概念，被很多人认为是荷兰人幸福感的秘密。\"},{\"word\":\"Leiliviskaja\",\"language\":\"爱沙尼亚语\",\"pronunciation\":\"/ˈleiliˌviskɑjɑ/\",\"literal_meaning\":\"浇水人\",\"chinese_explanation\":\"在桑拿房里负责往热石头上浇水以产生蒸汽的那个人——一个在爱沙尼亚桑拿文化中不可或缺的角色。\",\"english_approximation\":\"person who throws water on sauna rocks\",\"emotion_tags\":[\"桑拿\",\"仪式\",\"北欧文化\"],\"usage_scenario\":\"桑拿房里那位掌握着\\\"蒸汽节奏\\\"的关键人物。\",\"user_search_description\":\"蒸桑拿时那个往石头上浇水的关键角色\",\"cultural_note\":\"桑拿在爱沙尼亚和芬兰都有着近乎神圣的地位。\"},{\"word\":\"Bérézina\",\"language\":\"法语\",\"pronunciation\":\"/beʁezina/\",\"literal_meaning\":\"别列津纳河\",\"chinese_explanation\":\"一场惨烈的失败带来的恐慌感——源自 1812 年拿破仑军队在别列津纳河惨败的历史事件。法语中说\\\"C'est la Bérézina\\\"意味着\\\"全完了\\\"。\",\"english_approximation\":\"total defeat, complete disaster\",\"emotion_tags\":[\"失败\",\"恐慌\",\"绝望\",\"历史创伤\"],\"usage_scenario\":\"项目完全搞砸、比赛惨败、一切计划都泡汤时。\",\"user_search_description\":\"一切都完蛋了，那种兵败如山倒的恐慌感\",\"cultural_note\":\"200 多年后法国人仍然用这条白俄罗斯河流的名字来表达惨败。\"},{\"word\":\"Dépaysement\",\"language\":\"法语\",\"pronunciation\":\"/depeizmɑ̃/\",\"literal_meaning\":\"去国之感\",\"chinese_explanation\":\"离开自己国家后那种异乡人的不适感——混合了文化冲击、方向迷失和对改变的渴望。字面意思是\\\"被去-祖国化\\\"。\",\"english_approximation\":\"disorientation from being away from home, culture shock\",\"emotion_tags\":[\"异乡\",\"迷失\",\"文化冲击\",\"改变\"],\"usage_scenario\":\"刚搬到国外时的头几周、旅途中突然想家又享受新鲜感的矛盾。\",\"user_search_description\":\"到了一个完全陌生的地方，有点不安但又有点兴奋的复杂感觉\",\"cultural_note\":\"源于 pays（国家/土地），dépayser 字面上是\\\"让某人脱离自己的土地\\\"。\"},{\"word\":\"Bricoleur\",\"language\":\"法语\",\"pronunciation\":\"/bʁikɔlœʁ/\",\"literal_meaning\":\"万能工匠\",\"chinese_explanation\":\"一个用任何手边能找到的材料来创造或修理东西的人——DIY 精神的法国版本。\",\"english_approximation\":\"handyman, DIY-er, tinkerer\",\"emotion_tags\":[\"创造\",\"动手\",\"机智\",\"生活技能\"],\"usage_scenario\":\"用废旧材料做了一个书架、靠自己修理好漏水的管道。\",\"user_search_description\":\"手边有啥用啥，自己动手修修补补创造东西的那种人\",\"cultural_note\":\"法国哲学家列维-斯特劳斯用 bricolage 来比喻神话思维的运作方式。\"},{\"word\":\"Flâneur\",\"language\":\"法语\",\"pronunciation\":\"/flɑnœʁ/\",\"literal_meaning\":\"漫步者\",\"chinese_explanation\":\"一个悠闲地在城市街道上漫步、品味城市氛围和美感的人——不是赶路，而是沉浸在都市风景中。\",\"english_approximation\":\"stroller, urban wanderer\",\"emotion_tags\":[\"悠闲\",\"城市\",\"观察\",\"审美\",\"漫游\"],\"usage_scenario\":\"在巴黎街头漫无目的地走、观察行人、咖啡馆的风景。\",\"user_search_description\":\"不是去任何地方，只是在城市里闲逛、看风景、看人群的那种悠闲\",\"cultural_note\":\"19 世纪巴黎独有的文化形象，波德莱尔、本雅明都曾深入探讨过 flâneur 的概念。\"},{\"word\":\"L'appel du vide\",\"language\":\"法语\",\"pronunciation\":\"/lapɛl dy vid/\",\"literal_meaning\":\"虚空的召唤\",\"chinese_explanation\":\"站在高处时脑中闪过的那一声\\\"跳下去\\\"的念头——不是想自杀，而是一种荒谬的、一闪而过的冲动。\",\"english_approximation\":\"the call of the void\",\"emotion_tags\":[\"冲动\",\"恐惧\",\"虚无\",\"心理\"],\"usage_scenario\":\"站在阳台上、悬崖边、地铁站台边时突然冒出的那个念头。\",\"user_search_description\":\"站在高处时脑子里突然闪过一个声音说'跳下去吧'，但自己其实并不想死\",\"cultural_note\":\"心理学上被称为\\\"高现象\\\"（High Place Phenomenon），是大脑对危险的一种扭曲反应。\"},{\"word\":\"L'esprit de l'escalier\",\"language\":\"法语\",\"pronunciation\":\"/lɛspʁi də lɛskalje/\",\"literal_meaning\":\"楼梯之智\",\"chinese_explanation\":\"争论结束、你已经走下楼梯时才想到的那句完美的回击——可惜太晚了。\",\"english_approximation\":\"staircase wit, afterthought comeback\",\"emotion_tags\":[\"遗憾\",\"懊恼\",\"机智\",\"事后诸葛亮\"],\"usage_scenario\":\"任何\\\"我当时怎么没想到这么说！\\\"的时刻。\",\"user_search_description\":\"吵完架、已经走了以后才突然想到一句特别绝的回话——来不及了！\",\"cultural_note\":\"与意第绪语的 trepverter 和德语的 Treppenwitz 完全对应。\"},{\"word\":\"Backpfeifengesicht\",\"language\":\"德语\",\"pronunciation\":\"/ˈbakˌpfaɪfənɡəˌzɪçt/\",\"literal_meaning\":\"欠抽的脸\",\"chinese_explanation\":\"一张让人看了就忍不住想扇一巴掌的脸——德语中最具\\\"攻击性幽默\\\"的复合词之一。\",\"english_approximation\":\"a face in need of a slap\",\"emotion_tags\":[\"愤怒\",\"幽默\",\"讽刺\",\"厌恶\"],\"usage_scenario\":\"对特别讨厌或自以为是的人的内心的\\\"暴力冲动\\\"。\",\"user_search_description\":\"看到那个人就想给他一耳光的冲动\",\"cultural_note\":\"Backpfeife（耳光）+ Gesicht（脸），德语构词法的经典之作。\"},{\"word\":\"Erklärungsnot\",\"language\":\"德语\",\"pronunciation\":\"/ɛɐ̯ˈklɛːʁʊŋsˌnoːt/\",\"literal_meaning\":\"解释危机\",\"chinese_explanation\":\"一种迫切需要解释某事（自己的行为或当前处境）但又很难说清楚的窘迫状态。\",\"english_approximation\":\"urgent need to explain, struggling to explain\",\"emotion_tags\":[\"窘迫\",\"焦虑\",\"解释\",\"社交压力\"],\"usage_scenario\":\"被当场抓住做某事时需要马上给出一个合理的解释。\",\"user_search_description\":\"被问到一个问题，心里知道必须马上解释但舌头打结了\",\"cultural_note\":\"Erklärung（解释）+ Not（紧急/困境），直译是\\\"解释的困境\\\"。\"},{\"word\":\"Fachidiot\",\"language\":\"德语\",\"pronunciation\":\"/ˈfaxʔidiˌoːt/\",\"literal_meaning\":\"专业白痴\",\"chinese_explanation\":\"在自己的专业领域极其出色，但出了这个领域就完全无知的专家型\\\"白痴\\\"。\",\"english_approximation\":\"subject-idiot, narrow specialist\",\"emotion_tags\":[\"讽刺\",\"专业\",\"狭隘\",\"幽默\"],\"usage_scenario\":\"那个对你专业问题解答如流但连基本生活常识都没有的同事。\",\"user_search_description\":\"专业能力超强但除了自己那点东西什么都不懂的人\",\"cultural_note\":\"Fach（专业/学科）+ Idiot（白痴），与英语 idiom 中的\\\"narrow specialist\\\"对应。\"},{\"word\":\"Fahrvergnügen\",\"language\":\"德语\",\"pronunciation\":\"/ˈfaːɐ̯fɛɐ̯ˌɡnyːɡn̩/\",\"literal_meaning\":\"驾驶愉悦\",\"chinese_explanation\":\"仅仅从开车本身获得的快乐和愉悦——不为到达，只为在路上。\",\"english_approximation\":\"driving pleasure\",\"emotion_tags\":[\"自由\",\"快乐\",\"驾驶\",\"速度\"],\"usage_scenario\":\"周末开着车兜风、在空旷的公路上感受速度与自由。\",\"user_search_description\":\"不为了去什么地方，就是开着车吹着风本身就特别开心\",\"cultural_note\":\"1990 年代大众汽车在美国的广告语让这个词全球闻名。\"},{\"word\":\"Handschuhschneeballwerfer\",\"language\":\"德语\",\"pronunciation\":\"/ˈhantʃuːˌʃneːbalˌvɛʁfɐ/\",\"literal_meaning\":\"戴手套扔雪球的人\",\"chinese_explanation\":\"一个懦弱的人——躲在安全距离外批评和攻击别人，自己却不敢承担任何风险。就像戴着手套扔雪球，打完就跑。\",\"english_approximation\":\"coward who criticizes from a safe distance\",\"emotion_tags\":[\"懦弱\",\"讽刺\",\"虚伪\",\"攻击性\"],\"usage_scenario\":\"网络匿名喷子、背后说坏话但从不敢当面对质的人。\",\"user_search_description\":\"躲在安全的地方骂人、从不敢正面硬刚的那种怂人\",\"cultural_note\":\"德语构词能力的巅峰之作——5 个词合成一个 24 字母的单词来骂人。\"},{\"word\":\"Schadenfreude\",\"language\":\"德语\",\"pronunciation\":\"/ˈʃaːdn̩ˌfʁɔʏdə/\",\"literal_meaning\":\"伤害之乐\",\"chinese_explanation\":\"看到别人（特别是自己不喜欢的人）倒霉时感到的那种幸灾乐祸的快乐。\",\"english_approximation\":\"joy at others' misfortune (borrowed as schadenfreude)\",\"emotion_tags\":[\"幸灾乐祸\",\"恶意\",\"快感\",\"暗爽\"],\"usage_scenario\":\"竞争对手搞砸了、讨厌的同事被老板骂。\",\"user_search_description\":\"看到讨厌的人倒霉，嘴上说着'好可怜'心里却在暗爽\",\"cultural_note\":\"这个德语词已经被英语直接借用了。\"},{\"word\":\"Schlimmbesserung\",\"language\":\"德语\",\"pronunciation\":\"/ˈʃlɪmˌbɛsəʁʊŋ/\",\"literal_meaning\":\"恶化式改良\",\"chinese_explanation\":\"本意是改善，结果却让事情变得更糟——好心办坏事的具体命名。\",\"english_approximation\":\"an improvement that makes things worse\",\"emotion_tags\":[\"挫败\",\"讽刺\",\"好心办坏事\"],\"usage_scenario\":\"修一个 bug 结果引入了三个新 bug、改造厨房结果比原来更不方便。\",\"user_search_description\":\"明明是想把事情变好，结果越弄越糟\",\"cultural_note\":\"schlimm（糟糕）+ Besserung（改善），自相矛盾的词却极其精准。\"},{\"word\":\"Schnapsidee\",\"language\":\"德语\",\"pronunciation\":\"/ˈʃnapsʔiˌdeː/\",\"literal_meaning\":\"烈酒主意\",\"chinese_explanation\":\"一个荒唐到只有在喝醉了的时候才可能想出来的主意。\",\"english_approximation\":\"a plan so ridiculous you must have been drunk\",\"emotion_tags\":[\"荒唐\",\"冲动\",\"醉酒\",\"后悔\"],\"usage_scenario\":\"凌晨三点突然决定明天去爬珠峰、醉后给前任发信息。\",\"user_search_description\":\"清醒的时候绝对不会干、喝多了才想得出来的那种蠢主意\",\"cultural_note\":\"Schnaps（烈酒）+ Idee（主意），德语自嘲式幽默的典型。\"},{\"word\":\"Sitzfleisch\",\"language\":\"德语\",\"pronunciation\":\"/ˈzɪtsˌflaɪʃ/\",\"literal_meaning\":\"坐肉\",\"chinese_explanation\":\"能够坐着熬过无聊事情的耐力和毅力——也指能够长时间保持坐姿认真工作的能力。\",\"english_approximation\":\"stamina to sit through something, staying power\",\"emotion_tags\":[\"耐力\",\"坚持\",\"坐功\",\"工作\"],\"usage_scenario\":\"听完一场冗长的会议、坐了 8 小时写论文没有动。\",\"user_search_description\":\"屁股坐得住——能够熬过无聊漫长的事情不跑路\",\"cultural_note\":\"sitzen（坐）+ Fleisch（肉），字面上就是\\\"坐着的肉\\\"，可以褒可以贬。\"},{\"word\":\"Treppenwitz\",\"language\":\"德语\",\"pronunciation\":\"/ˈtʁɛpn̩ˌvɪts/\",\"literal_meaning\":\"楼梯笑话\",\"chinese_explanation\":\"错过了时机才想到的那句绝妙回话。与法语 l'esprit de l'escalier 和意第绪语 trepverter 同义。\",\"english_approximation\":\"staircase wit, delayed comeback\",\"emotion_tags\":[\"遗憾\",\"机智\",\"懊恼\"],\"usage_scenario\":\"争论结束后走出门口才想到\\\"我当时应该这么说！\",\"user_search_description\":\"吵完架走了以后才突然想到一句特别绝的回话——来不急了\",\"cultural_note\":\"Treppe（楼梯）+ Witz（笑话/机智语），三大语言不约而同的发明。\"},{\"word\":\"Weichei\",\"language\":\"德语\",\"pronunciation\":\"/ˈvaɪçˌʔaɪ/\",\"literal_meaning\":\"软蛋\",\"chinese_explanation\":\"懦弱胆小的人——像一颗软趴趴的鸡蛋。德语的\\\"怂包\\\"。\",\"english_approximation\":\"wimp, coward\",\"emotion_tags\":[\"懦弱\",\"讽刺\",\"软蛋\"],\"usage_scenario\":\"朋友不敢坐过山车、不敢对老板说\\\"不\\\"。\",\"user_search_description\":\"胆小如鼠、什么都不敢做的那种软柿子\",\"cultural_note\":\"weich（软）+ Ei（蛋），和 Warmduscher 属于同一嘲讽体系。\"},{\"word\":\"Verschlimmbessern\",\"language\":\"德语\",\"pronunciation\":\"/fɛɐ̯ˈʃlɪmˌbɛsɐn/\",\"literal_meaning\":\"恶化式改良（动词）\",\"chinese_explanation\":\"Schlimmbesserung 的动词形式——好心办坏事的具体动作。\",\"english_approximation\":\"to make something worse while trying to fix it\",\"emotion_tags\":[\"挫败\",\"讽刺\",\"好心办坏事\"],\"usage_scenario\":\"试图修电脑结果把它搞得更坏。\",\"user_search_description\":\"想修好一个东西，结果越修越坏\",\"cultural_note\":\"verschlimmern（恶化）+ verbessern（改善），矛盾又精准的德语动词。\"},{\"word\":\"Chai-Pani\",\"language\":\"印地语\",\"pronunciation\":\"/tʃaːj paːniː/\",\"literal_meaning\":\"茶和水\",\"chinese_explanation\":\"在印度用来欢迎客人并提供饮品——但也可以委婉地指代为了快速办成事而给官僚或工作人员的小额贿赂。\",\"english_approximation\":\"welcome drinks; also, petty bribe\",\"emotion_tags\":[\"待客\",\"贿赂\",\"印度文化\",\"社交\"],\"usage_scenario\":\"印度家庭待客时说\\\"先喝杯茶\\\"；办证时给了点钱\\\"喝茶\\\"。\",\"user_search_description\":\"用'喝茶'这种说法来体面地送点小钱打点关系\",\"cultural_note\":\"印度日常文化中的双重含义词。\"},{\"word\":\"Namaste\",\"language\":\"印地语 / 梵语\",\"pronunciation\":\"/nəˈmɑːsteɪ/\",\"literal_meaning\":\"我向你鞠躬\",\"chinese_explanation\":\"一种手势和问候，合掌鞠躬的同时说\\\"namaste\\\"，意思是\\\"我向存在于你内心的神性致敬\\\"。超越了\\\"你好\\\"的层面。\",\"english_approximation\":\"I bow to the divine in you\",\"emotion_tags\":[\"敬意\",\"灵性\",\"和平\",\"连接\"],\"usage_scenario\":\"瑜伽课结束时的致意、印度人见面时的礼仪问候。\",\"user_search_description\":\"合掌行礼时那种'我尊重你内心最美好的那部分'的深度敬意\",\"cultural_note\":\"namas（鞠躬）+ te（向你），现已成为全球瑜伽文化的核心词汇。\"},{\"word\":\"Mencolek\",\"language\":\"印尼语\",\"pronunciation\":\"/mənˈtʃɔlɛk/\",\"literal_meaning\":\"轻拍反方向肩膀\",\"chinese_explanation\":\"一个轻松的恶作剧——从别人背后拍 ta 的反方向肩膀，让 ta 转头看错方向。\",\"english_approximation\":\"to tap someone's opposite shoulder as a prank\",\"emotion_tags\":[\"恶作剧\",\"幽默\",\"友谊\",\"玩笑\"],\"usage_scenario\":\"朋友之间的经典整蛊——\\\"嘿！\\\"（ta 转向左边，其实你在右边）。\",\"user_search_description\":\"从背后拍一下朋友的另一边肩膀，让 ta 转头看错方向——经典的整人小把戏\",\"cultural_note\":\"印尼语把这整条\\\"作案流程\\\"浓缩成一个词。\"},{\"word\":\"Cúbóg\",\"language\":\"爱尔兰语\",\"pronunciation\":\"/ˈkuːboːɡ/\",\"literal_meaning\":\"一批复活节彩蛋\",\"chinese_explanation\":\"一窝复活节彩蛋——爱尔兰语对这个特定节日物品有专门的量词。\",\"english_approximation\":\"a batch of Easter eggs\",\"emotion_tags\":[\"节日\",\"复活节\",\"童趣\"],\"usage_scenario\":\"复活节早晨找到的一堆彩蛋。\",\"user_search_description\":\"复活节那天在花园里找到的一堆五颜六色的彩蛋\",\"cultural_note\":\"爱尔兰语对节庆细节的命名非常精确。\"},{\"word\":\"Commovente\",\"language\":\"意大利语\",\"pronunciation\":\"/kommoˈvɛnte/\",\"literal_meaning\":\"令人感动的\",\"chinese_explanation\":\"让人感动到流泪的——commuovere 的形容词形式。\",\"english_approximation\":\"heartwarming, deeply moving\",\"emotion_tags\":[\"感动\",\"泪点\",\"温暖\"],\"usage_scenario\":\"描述一部让你哭得不行的电影。\",\"user_search_description\":\"一部电影或一个故事让你感动到忍不住掉眼泪\",\"cultural_note\":\"与本书中 commuovere 同一词根。\"},{\"word\":\"Gattara\",\"language\":\"意大利语\",\"pronunciation\":\"/ɡatˈtaːra/\",\"literal_meaning\":\"猫女\",\"chinese_explanation\":\"一个全身心投入到照顾和喂养流浪猫或家猫的女性——比\\\"猫奴\\\"更极端、更温柔。\",\"english_approximation\":\"cat lady, devoted cat caretaker\",\"emotion_tags\":[\"猫\",\"温柔\",\"奉献\",\"意大利街头\"],\"usage_scenario\":\"那个每天带着猫粮在小区里喂流浪猫的阿姨。\",\"user_search_description\":\"不是普通的喜欢猫，而是把喂猫照顾猫当成人生使命的那种人\",\"cultural_note\":\"在意大利城市中，gattara 是一种被认可的社会角色。\"},{\"word\":\"Bakku-shan\",\"language\":\"日语\",\"pronunciation\":\"/bakkɯɕaɴ/\",\"literal_meaning\":\"背影美人\",\"chinese_explanation\":\"从背后看非常漂亮，但正面就……不那么理想的女生。\",\"english_approximation\":\"a girl who looks beautiful from behind\",\"emotion_tags\":[\"失望\",\"外貌\",\"幽默\",\"约会\"],\"usage_scenario\":\"看到一个人的背影被惊艳到，走到前面发现……\",\"user_search_description\":\"从后面看特别好看，走到前面发现跟想象中不一样的那种小失落\",\"cultural_note\":\"bakku（back，来自英语）+ shan（schön/美，来自德语），日语中的混血外来语。\"},{\"word\":\"Kyōiku mama\",\"language\":\"日语\",\"pronunciation\":\"/kjoːikɯ mama/\",\"literal_meaning\":\"教育妈妈\",\"chinese_explanation\":\"一个不遗余力地逼迫孩子在学业上取得优异成绩的母亲——带有贬义，暗示过度干预和施压。\",\"english_approximation\":\"education-obsessed mother, tiger mom\",\"emotion_tags\":[\"教育\",\"压力\",\"母爱\",\"日本社会\"],\"usage_scenario\":\"那种让孩子从早学到晚、上所有补习班的妈妈。\",\"user_search_description\":\"那种把孩子的成绩看得比什么都重、拼命鸡娃的妈妈\",\"cultural_note\":\"kyōiku（教育）+ mama（妈妈），日本学历社会的产物。\"},{\"word\":\"Nekama\",\"language\":\"日语\",\"pronunciation\":\"/nekama/\",\"literal_meaning\":\"网络性别伪装\",\"chinese_explanation\":\"一个在现实生活中通常是异性恋、但在网络上以女性身份出现的男性。\",\"english_approximation\":\"a man who presents as female online\",\"emotion_tags\":[\"网络\",\"身份\",\"伪装\"],\"usage_scenario\":\"网络游戏或论坛中伪装成女性的男性用户。\",\"user_search_description\":\"在网上装成女生的那种人\",\"cultural_note\":\"ne（网络）+ kama（女装），日语网络文化特有词汇。\"},{\"word\":\"Yoko meshi\",\"language\":\"日语\",\"pronunciation\":\"/joko meɕi/\",\"literal_meaning\":\"横着吃饭\",\"chinese_explanation\":\"说外语时感受到的压力和不适——像被横过来吃饭一样别扭。特指日本人在说非母语时的那种独特焦虑。\",\"english_approximation\":\"the stress of speaking a foreign language\",\"emotion_tags\":[\"焦虑\",\"外语\",\"压力\",\"日本\"],\"usage_scenario\":\"在日本人和外国人交流时，日本人那种\\\"英语好难\\\"的焦虑。\",\"user_search_description\":\"说外语的时候整个人都别别扭扭的，像被横过来了一样不自在\",\"cultural_note\":\"yoko（横）+ meshi（饭），用吃饭的姿势来比喻说外语的不自然感。\"},{\"word\":\"Gosohada\",\"language\":\"韩语\",\"pronunciation\":\"/kosʰoɦada/\",\"literal_meaning\":\"活该\",\"chinese_explanation\":\"看到某人终于得到了应有的报应时那种\\\"哈！活该！\\\"的爽快感。\",\"english_approximation\":\"feeling of satisfaction when someone gets their comeuppance\",\"emotion_tags\":[\"痛快\",\"报应\",\"暗爽\",\"正义\"],\"usage_scenario\":\"那个总是欺负你的人终于被老板骂了。\",\"user_search_description\":\"看到讨厌的人终于倒霉了，心里忍不住喊一句'该！'\",\"cultural_note\":\"比 schadenfreude 更带有\\\"天道好轮回\\\"的正义感。\"},{\"word\":\"Kaapshljmurslis\",\"language\":\"拉脱维亚语\",\"pronunciation\":\"/ˈkaːpʃljmurslis/\",\"literal_meaning\":\"拥挤中的不适\",\"chinese_explanation\":\"在高峰期的拥挤公交或地铁上那种被挤得浑身不舒服的感觉。\",\"english_approximation\":\"cramped discomfort in crowded public transit\",\"emotion_tags\":[\"拥挤\",\"不适\",\"通勤\",\"城市生活\"],\"usage_scenario\":\"早晚高峰被挤成照片的通勤体验。\",\"user_search_description\":\"早晚高峰被挤在地铁里那种浑身难受、动弹不得的感觉\",\"cultural_note\":\"拉脱维亚语用这个词来命名现代城市的通勤地狱。\"},{\"word\":\"Papakata\",\"language\":\"库克群岛毛利语\",\"pronunciation\":\"/papakata/\",\"literal_meaning\":\"一条腿比另一条短\",\"chinese_explanation\":\"天生或后天造成的一条腿比另一条腿短的身体状况。\",\"english_approximation\":\"to have one leg shorter than the other\",\"emotion_tags\":[\"身体\",\"差异\",\"日常\"],\"usage_scenario\":\"描述走路姿态不对称的原因。\",\"user_search_description\":\"走路一高一低的——一条腿比另一条短一点点\",\"cultural_note\":\"太平洋岛国语言中对身体特征的细致命名。\"},{\"word\":\"Uffda!\",\"language\":\"挪威语\",\"pronunciation\":\"/ˈʉfːda/\",\"literal_meaning\":\"哎呀！\",\"chinese_explanation\":\"一个多功能的感叹词，表达惊讶、同情、疲惫或\\\"天啊，真不容易\\\"——相当于\\\"哎呀\\\"、\\\"天哪\\\"、\\\"辛苦你了\\\"的综合体。\",\"english_approximation\":\"Oh dear! / Ouch for you! / I'm overwhelmed!\",\"emotion_tags\":[\"同情\",\"惊讶\",\"共感\",\"挪威\"],\"usage_scenario\":\"听到朋友讲了一个特别惨的经历、看到有人摔了一跤。\",\"user_search_description\":\"听到别人讲了一件特别糟心的事，不由自主地'哎呀'一声\",\"cultural_note\":\"在挪威裔美国人社区中特别常见，常常表达\\\"我受不了了\\\"。\"},{\"word\":\"Tingo\",\"language\":\"帕斯夸语（复活节岛）\",\"pronunciation\":\"/ˈtiŋo/\",\"literal_meaning\":\"慢慢借光\",\"chinese_explanation\":\"不停地向邻居家借东西但从不归还——一件接一件，直到把对方家搬空。\",\"english_approximation\":\"to gradually steal everything by borrowing\",\"emotion_tags\":[\"借\",\"偷\",\"关系\",\"幽默\"],\"usage_scenario\":\"那个总是来借东西但从不还的邻居。\",\"user_search_description\":\"今天借个碗明天借个工具，从来不还，慢慢地就把你家的东西都'借'光了\",\"cultural_note\":\"来自复活节岛的原住民语言，完美描述了\\\"借而不还\\\"的艺术。\"},{\"word\":\"Dożywocie\",\"language\":\"波兰语\",\"pronunciation\":\"/dɔʐɨˈvɔtɕɛ/\",\"literal_meaning\":\"终身契约\",\"chinese_explanation\":\"父母和孩子之间的一种契约——父母把房产过户给孩子，作为交换，孩子承诺照顾父母的余生。\",\"english_approximation\":\"lifetime care contract in exchange for real estate\",\"emotion_tags\":[\"家庭\",\"责任\",\"互惠\",\"传统\"],\"usage_scenario\":\"波兰家庭中的一种传统安排。\",\"user_search_description\":\"把房子给子女，子女保证养你到老的那种一辈子的约定\",\"cultural_note\":\"反映了波兰社会中代际之间的物质与情感交换模式。\"},{\"word\":\"Formacja\",\"language\":\"波兰语\",\"pronunciation\":\"/fɔrˈmatsja/\",\"literal_meaning\":\"形成/塑造\",\"chinese_explanation\":\"广泛存在于某一代人或某个时代中的集体心态和精神状态——类似德语 Zeitgeist（时代精神）。\",\"english_approximation\":\"generational mindset, zeitgeist\",\"emotion_tags\":[\"时代\",\"集体\",\"精神\",\"代际\"],\"usage_scenario\":\"描述 90 后的集体心态或战后的国民精神状态。\",\"user_search_description\":\"不是一个人的想法，而是整整一代人共同的那种精神状态\",\"cultural_note\":\"波兰版的时代精神。\"},{\"word\":\"Kilkanaście\",\"language\":\"波兰语\",\"pronunciation\":\"/kilkaˈnaɕtɕɛ/\",\"literal_meaning\":\"十几\",\"chinese_explanation\":\"特指 12 到 19 之间的任意数字——英语中 \\\"umpteen\\\" 接近但不够精确，kilkanaście 非常明确地指向 12-19 这个范围。\",\"english_approximation\":\"any number between 12 and 19\",\"emotion_tags\":[\"数学\",\"精确\",\"波兰语\"],\"usage_scenario\":\"来了 kilkanaście 个人\\\"——大概十几个人。\",\"user_search_description\":\"专门用来表示 12 到 19 之间的数字，比'十几个'更精确\",\"cultural_note\":\"波兰语对数字范围的颗粒度比英语精细得多。\"},{\"word\":\"Kombinować\",\"language\":\"波兰语\",\"pronunciation\":\"/kɔmbiˈnɔvatɕ/\",\"literal_meaning\":\"凑合/想办法\",\"chinese_explanation\":\"在资源极度有限的条件下，用非传统、不寻常的方式解决一个问题——波兰式的\\\"穷办法\\\"和\\\"野路子\\\"。\",\"english_approximation\":\"to solve a problem with minimal resources in an unconventional way\",\"emotion_tags\":[\"创造力\",\"求生\",\"贫困\",\"机智\"],\"usage_scenario\":\"用废旧零件修好了一辆车、没钱但硬是办成了一场婚礼。\",\"user_search_description\":\"没钱没资源，但靠各种野路子和聪明劲硬是把事办成了\",\"cultural_note\":\"在波兰共产主义时期的物资短缺中，kombinować 是一种生存必备技能。\"},{\"word\":\"Radioukacz\",\"language\":\"波兰语\",\"pronunciation\":\"/radjɔˈukatʂ/\",\"literal_meaning\":\"无线电窃听者\",\"chinese_explanation\":\"铁幕苏联一侧抵抗运动中的无线电电报员——在高压体制下从事秘密通讯的人。\",\"english_approximation\":\"telegraphist in the resistance movements behind the Iron Curtain\",\"emotion_tags\":[\"抵抗\",\"秘密\",\"冷战\",\"历史\"],\"usage_scenario\":\"冷战时期波兰抵抗运动的特定历史角色。\",\"user_search_description\":\"那种在高压统治下冒着生命危险做秘密电台工作的抵抗者\",\"cultural_note\":\"冷战时期中东欧历史的特定产物。\"},{\"word\":\"Zalatwic\",\"language\":\"波兰语\",\"pronunciation\":\"/zaˈwatfitɕ/\",\"literal_meaning\":\"搞定\",\"chinese_explanation\":\"通过贿赂、人脉关系或个人魅力来\\\"搞定\\\"一件事——通常涉及钻空子或走灰色地带。在波兰共产主义时期几乎无法在不 zalatwic 的情况下生活。\",\"english_approximation\":\"to get something done through bribes, connections, or charm\",\"emotion_tags\":[\"办事\",\"人情\",\"灰色\",\"体制\"],\"usage_scenario\":\"排队买东西时通过熟人插队、用关系搞到稀缺物资。\",\"user_search_description\":\"不走正道，靠关系或小手段把一件事摆平\",\"cultural_note\":\"与俄语 blat 和中文\\\"关系\\\"有相似之处，但更偏实际操作层面。\"},{\"word\":\"Desenrascanço\",\"language\":\"葡萄牙语\",\"pronunciation\":\"/dɨzẽʁɐʃˈkɐ̃su/\",\"literal_meaning\":\"脱困\",\"chinese_explanation\":\"动用一切可用的手段从困境中\\\"脱身\\\"——一种葡萄牙式的即兴解决问题能力。在最后一刻、几乎是奇迹般地逃脱困境。\",\"english_approximation\":\"disentangling oneself from a difficult situation\",\"emotion_tags\":[\"脱困\",\"机智\",\"救急\",\"葡萄牙精神\"],\"usage_scenario\":\"最后一分钟写完论文、用零钱凑够了回家的车票。\",\"user_search_description\":\"眼看着要完蛋了，硬是用各种办法把自己从坑里捞出来了\",\"cultural_note\":\"被很多葡萄牙人认为是国民性格的一部分——\\\"总能想办法脱身\\\"。\"},{\"word\":\"Pochemuchka\",\"language\":\"俄语\",\"pronunciation\":\"/pətɕɪˈmutɕkə/\",\"literal_meaning\":\"为什么小孩\",\"chinese_explanation\":\"一个问个不停的人（通常是小孩）——\\\"为什么天是蓝的？为什么鸟会飞？为什么？为什么？\",\"english_approximation\":\"a person who asks too many questions\",\"emotion_tags\":[\"好奇\",\"童真\",\"烦人\",\"可爱\"],\"usage_scenario\":\"三岁小孩进入了\\\"十万个为什么\\\"阶段。\",\"user_search_description\":\"那个总是追着你问'为什么'的小孩——什么都想知道，什么都想弄明白\",\"cultural_note\":\"来自苏联时代一本流行儿童书的主角 Alyosha Pochemuchka。\"},{\"word\":\"Zapoi\",\"language\":\"俄语\",\"pronunciation\":\"/zɐˈpoj/\",\"literal_meaning\":\"连续酗酒\",\"chinese_explanation\":\"连续喝醉好几天，醒来时发现自己在完全陌生的地方——俄式的\\\"宿醉漂流\\\"。\",\"english_approximation\":\"being drunk for several days and waking up somewhere unexpected\",\"emotion_tags\":[\"酒精\",\"迷失\",\"放逐\",\"俄罗斯\"],\"usage_scenario\":\"俄罗斯文学中常见的\\\"喝到失忆、醒来不知身在何处\\\"。\",\"user_search_description\":\"醉了好几天，一睁眼发现自己在一个完全不知道是哪里的地方\",\"cultural_note\":\"俄语中对酗酒文化有极其丰富的词汇体系。\"},{\"word\":\"Zloradstvovat\",\"language\":\"俄语\",\"pronunciation\":\"/zlɐˈratstvəvətʲ/\",\"literal_meaning\":\"以恶意的方式高兴\",\"chinese_explanation\":\"看到别人倒霉时恶意地、恶魔般地开心——不同于 schadenfreude 的暗爽，zloradstvovat 带有更明显的恶意和邪恶色彩。\",\"english_approximation\":\"to be devilishly happy at someone's misfortune\",\"emotion_tags\":[\"恶毒\",\"幸灾乐祸\",\"报复快感\"],\"usage_scenario\":\"仇人遭殃时那种\\\"太好了，活该！\\\"的恶意快感。\",\"user_search_description\":\"看到恨的人倒霉时那种充满恶意的、近乎恶魔般的开心\",\"cultural_note\":\"zlo（恶）+ rad（高兴）+ stvovat（动词后缀），比 schadenfreude 多了一层\\\"恶意\\\"。\"},{\"word\":\"Vedriti\",\"language\":\"斯洛文尼亚语\",\"pronunciation\":\"/ˈʋɛːdriti/\",\"literal_meaning\":\"避雨\",\"chinese_explanation\":\"字面上是躲避雨水——但也可以比喻性地指等待负面情绪过去。\",\"english_approximation\":\"to shelter from the rain / to wait for bad emotions to pass\",\"emotion_tags\":[\"避雨\",\"等待\",\"情绪管理\",\"隐喻\"],\"usage_scenario\":\"下雨时躲进屋檐下；心情不好时告诉自己\\\"坏情绪会过去的\\\"。\",\"user_search_description\":\"像等雨停一样等坏心情过去——躲一躲就会好的\",\"cultural_note\":\"斯洛文尼亚语中物理行为和情感体验共用同一个动词。\"},{\"word\":\"Spregledati\",\"language\":\"斯洛文尼亚语\",\"pronunciation\":\"/sprɛˈɡlɛːdati/\",\"literal_meaning\":\"同时看到又忽略\",\"chinese_explanation\":\"在更深的层面理解一个人的同时，也选择性地忽略某些东西——一种\\\"看透但不戳破\\\"的默契。\",\"english_approximation\":\"to simultaneously understand and overlook\",\"emotion_tags\":[\"理解\",\"忽略\",\"默契\",\"复杂\"],\"usage_scenario\":\"你知道朋友在说谎但选择不揭穿。\",\"user_search_description\":\"我知道你在想什么，但我不说破——看到也当没看到\",\"cultural_note\":\"斯洛文尼亚语中\\\"心照不宣\\\"的精准表达。\"},{\"word\":\"Anteayer\",\"language\":\"西班牙语\",\"pronunciation\":\"/anteaˈʝeɾ/\",\"literal_meaning\":\"前天\",\"chinese_explanation\":\"前天\\\"——英语需要用两个词（the day before yesterday），西班牙语一个词解决。\",\"english_approximation\":\"the day before yesterday\",\"emotion_tags\":[\"时间\",\"简洁\"],\"usage_scenario\":\"任何需要说\\\"前天\\\"的时候。\",\"user_search_description\":\"英语要用三个词说的'前天'，西班牙语一个词就够了\",\"cultural_note\":\"ante（之前）+ ayer（昨天），西班牙语的时间效率。\"},{\"word\":\"Chingada\",\"language\":\"墨西哥西班牙语（粗俗）\",\"pronunciation\":\"/tʃinˈɡada/\",\"literal_meaning\":\"被毁掉的\",\"chinese_explanation\":\"一个多功能的粗俗词——可以指一个遥远的地狱般的地方（\\\"滚到 chingada 去！\\\"），也可以是 f-word 的变体。\",\"english_approximation\":\"hell / f**k (vulgar)\",\"emotion_tags\":[\"愤怒\",\"粗俗\",\"墨西哥文化\"],\"usage_scenario\":\"极其愤怒时的宣泄。\",\"user_search_description\":\"一句可以让你从'滚蛋'骂到天际的万能脏话\",\"cultural_note\":\"只能在不正式场合使用，源自动词 chingar（毁掉/搞砸）。\"},{\"word\":\"Desvelado\",\"language\":\"西班牙语\",\"pronunciation\":\"/desbeˈlado/\",\"literal_meaning\":\"失眠的/醒着的\",\"chinese_explanation\":\"完全清醒、无法入睡的状态——西班牙人虽然以午睡闻名，但也有描述\\\"睡不着\\\"的专门词汇。\",\"english_approximation\":\"wide awake, unable to sleep\",\"emotion_tags\":[\"失眠\",\"清醒\",\"夜晚\"],\"usage_scenario\":\"凌晨三点眼睛瞪得溜圆。\",\"user_search_description\":\"睡不着，眼睛睁得大大的，脑子里全是乱七八糟的想法\",\"cultural_note\":\"来自动词 desvelar（保持清醒/揭露）。\"},{\"word\":\"Duende\",\"language\":\"西班牙语\",\"pronunciation\":\"/ˈdwendə/\",\"literal_meaning\":\"精灵/魔力\",\"chinese_explanation\":\"表演者散发出的那种把观众完全吸引住的强烈情感和表现力——在弗拉门戈舞蹈和音乐中尤为明显。它很难描述，但你看到的时候一定知道那就是 duende。\",\"english_approximation\":\"heightened emotion and expression that captivates an audience\",\"emotion_tags\":[\"魅力\",\"魔力\",\"表演\",\"西班牙\",\"弗拉门戈\"],\"usage_scenario\":\"弗拉门戈舞者进入忘我状态、歌手把所有人唱哭。\",\"user_search_description\":\"不是技术好不好的问题，而是在舞台上整个人发光、让你移不开眼的那种说不清的魔力\",\"cultural_note\":\"另一个含义是神话中的精灵/妖精。\"},{\"word\":\"Encandilar\",\"language\":\"西班牙语\",\"pronunciation\":\"/enkandiˈlaɾ/\",\"literal_meaning\":\"被闪到\",\"chinese_explanation\":\"突然看到强光之后眼前出现光斑的那种感觉——被晃到了眼睛。\",\"english_approximation\":\"to be dazzled/blinded by a bright flash\",\"emotion_tags\":[\"视觉\",\"刺眼\",\"身体感\"],\"usage_scenario\":\"对着太阳看了一眼、被人用闪光灯照了一下。\",\"user_search_description\":\"被强光闪了一下，眼前全是那种白白的光斑\",\"cultural_note\":\"来自 encandilarse（被晃到眼睛）。\"},{\"word\":\"Friolero\",\"language\":\"西班牙语\",\"pronunciation\":\"/fɾjoˈleɾo/\",\"literal_meaning\":\"怕冷的人\",\"chinese_explanation\":\"一个特别容易感觉冷、对低温特别敏感的人。\",\"english_approximation\":\"person who is sensitive to cold\",\"emotion_tags\":[\"寒冷\",\"体质\",\"日常\"],\"usage_scenario\":\"那个夏天都要穿长袖的朋友。\",\"user_search_description\":\"别人都觉得还好的温度，我就已经冷到不行了——特别怕冷\",\"cultural_note\":\"意大利语也有对应词 freddoloso。\"},{\"word\":\"Madrugada\",\"language\":\"西班牙语\",\"pronunciation\":\"/madɾuˈɡada/\",\"literal_meaning\":\"破晓\",\"chinese_explanation\":\"午夜到黎明之间那段最深的夜——天还没亮、世界还在沉睡的时刻。\",\"english_approximation\":\"early morning, the hours between midnight and dawn\",\"emotion_tags\":[\"黎明\",\"寂静\",\"夜\",\"时间\"],\"usage_scenario\":\"凌晨四点起床赶飞机的那段时间。\",\"user_search_description\":\"天还没亮、整个世界都在睡觉的那几个小时\",\"cultural_note\":\"西班牙语和葡萄牙语都有的词。\"},{\"word\":\"Tuerto\",\"language\":\"西班牙语\",\"pronunciation\":\"/ˈtweɾto/\",\"literal_meaning\":\"独眼\",\"chinese_explanation\":\"一只眼睛失明的人——英语没有单独的词，只能说 \\\"one-eyed man\\\"。\",\"english_approximation\":\"one-eyed person\",\"emotion_tags\":[\"身体\",\"差异\"],\"usage_scenario\":\"描述只有一只眼睛有视力的人。\",\"user_search_description\":\"只有一只眼睛能看见的人\",\"cultural_note\":\"西班牙语在身体特征命名方面有自己独特的词库。\"},{\"word\":\"Tutear\",\"language\":\"西班牙语\",\"pronunciation\":\"/tuteˈaɾ/\",\"literal_meaning\":\"用\\\"你\\\"称呼\",\"chinese_explanation\":\"在与熟人或朋友交谈时使用非正式的 \\\"tú\\\" 而非正式的 \\\"usted\\\"——\\\"以你相称\\\"的动词版。\",\"english_approximation\":\"to address someone informally using \\\"tú\",\"emotion_tags\":[\"亲近\",\"非正式\",\"关系\",\"语言礼仪\"],\"usage_scenario\":\"从 \\\"usted\\\" 升级到 \\\"tú\\\" 的那一刻——关系近了。\",\"user_search_description\":\"不再用'您'而是用'你'称呼对方了——关系拉近的标志性时刻\",\"cultural_note\":\"法语对应的词是 tutoyer。\"},{\"word\":\"Badkruka\",\"language\":\"瑞典语\",\"pronunciation\":\"/ˈbɑːdˌkrʉːka/\",\"literal_meaning\":\"洗澡胆小鬼\",\"chinese_explanation\":\"因为水太冷而不太敢在户外水域游泳的人——不愿意跳进冰冷的湖水。\",\"english_approximation\":\"someone hesitant to swim in cold open water\",\"emotion_tags\":[\"犹豫\",\"怕冷\",\"游泳\",\"瑞典夏日\"],\"usage_scenario\":\"夏天在瑞典湖边别人都跳下去了你还在岸边用脚试水温。\",\"user_search_description\":\"水太冷了不敢下水——在岸边用脚沾一点又缩回来的那种犹豫\",\"cultural_note\":\"bad（洗澡）+ kruka（胆小鬼），瑞典式的自嘲。\"},{\"word\":\"Blunda\",\"language\":\"瑞典语\",\"pronunciation\":\"/ˈblɵnda/\",\"literal_meaning\":\"闭眼\",\"chinese_explanation\":\"刻意闭上眼睛不去看某样东西或不愿面对某个残酷真相——\\\"视而不见\\\"的动词。\",\"english_approximation\":\"to close your eyes to avoid seeing something\",\"emotion_tags\":[\"逃避\",\"无视\",\"拒绝\",\"自我保护\"],\"usage_scenario\":\"假装没看到账单上的数字、对不好的事情选择性无视。\",\"user_search_description\":\"明明知道是怎么回事但就是闭上眼睛不想看、不想面对\",\"cultural_note\":\"对应英语中的 \\\"turn a blind eye\\\"。\"},{\"word\":\"Jobbig\",\"language\":\"瑞典语\",\"pronunciation\":\"/ˈjɔbɪɡ/\",\"literal_meaning\":\"麻烦的\",\"chinese_explanation\":\"一个全能型的\\\"麻烦\\\"词——可以用来形容人、事情、任务、几乎所有让人烦心、累人、棘手的东西。\",\"english_approximation\":\"troublesome, annoying, difficult\",\"emotion_tags\":[\"烦恼\",\"疲惫\",\"麻烦\",\"全能词\"],\"usage_scenario\":\"今天我们老板特别 jobbig\\\"——这一周都很 jobbig。\",\"user_search_description\":\"说不上来哪里不对但就是烦——人烦、事烦、什么都烦\",\"cultural_note\":\"瑞典语的万能抱怨词。\"},{\"word\":\"Gigil\",\"language\":\"他加禄语（菲律宾）\",\"pronunciation\":\"/ˈɡiɡil/\",\"literal_meaning\":\"想捏的冲动\",\"chinese_explanation\":\"看到极其可爱的东西时那种\\\"好想揉捏它\\\"的冲动——比如看到婴儿的胖脸颊时想掐一下。\",\"english_approximation\":\"overwhelming urge to squeeze something cute\",\"emotion_tags\":[\"可爱\",\"冲动\",\"攻击性萌\",\"身体反应\"],\"usage_scenario\":\"看到一只胖猫、一个可爱宝宝就想上手捏的冲动。\",\"user_search_description\":\"看到太可爱的东西忍不住想上手捏一把咬一口的冲动\",\"cultural_note\":\"菲律宾日常用语中的高频情感词。\"},{\"word\":\"Ilunga\",\"language\":\"齐鲁巴语（刚果）\",\"pronunciation\":\"/iˈluŋɡa/\",\"literal_meaning\":\"三次原谅\",\"chinese_explanation\":\"一个愿意原谅第一次、容忍第二次、但绝不会有第三次的人——\\\"事不过三\\\"的人格化。\",\"english_approximation\":\"a person who forgives once, tolerates twice, but never a third time\",\"emotion_tags\":[\"原谅\",\"底线\",\"边界\",\"智慧\"],\"usage_scenario\":\"描述一个有一条清晰底线的人。\",\"user_search_description\":\"我可以原谅一次、忍你一次，但第三次我一定翻脸——我有底线\",\"cultural_note\":\"2004 年被一个翻译调查评为\\\"世界上最难翻译的词\\\"之一。\"},{\"word\":\"Farpotshket\",\"language\":\"意第绪语\",\"pronunciation\":\"/faʁˈpɔtʃkɛt/\",\"literal_meaning\":\"被修坏了\",\"chinese_explanation\":\"你或者你信任的人试图修理某样东西，结果不仅没修好，反而造成了不可挽回的损坏——\\\"被好心修坏了\\\"。\",\"english_approximation\":\"ruined by an attempt to fix it\",\"emotion_tags\":[\"挫败\",\"后悔\",\"无奈\",\"耸肩\"],\"usage_scenario\":\"找人修水龙头，结果整个水管爆了。\",\"user_search_description\":\"本来只是个小毛病，被'修'了一下之后彻底报废了——早知道不修了\",\"cultural_note\":\"相关动词 potshky 指\\\"善意的、但完全不会干的瞎捣鼓\\\"。\"},{\"word\":\"Chutzpah\",\"language\":\"意第绪语\",\"pronunciation\":\"/ˈxʊtspə/\",\"literal_meaning\":\"脸皮厚/胆子大\",\"chinese_explanation\":\"一种\\\"敢说敢做不要脸\\\"的态度——在别人都觉得不可能的情况下硬着头皮上的勇气和厚脸皮。可以褒义也可以贬义。\",\"english_approximation\":\"audacity, nerve, guts\",\"emotion_tags\":[\"勇气\",\"厚脸皮\",\"胆量\",\"大胆\"],\"usage_scenario\":\"你有 chutzpah 去向完全不认识的人借一大笔钱——而且居然借到了。\",\"user_search_description\":\"那种明知道不太可能但还是硬着头皮去做了的'不要脸'的勇气\",\"cultural_note\":\"最经典的 chutzpah 例子：一个人杀了自己的父母，然后请求法庭怜悯——因为他是孤儿。\"},{\"word\":\"Crepusculum\",\"language\":\"拉丁语\",\"pronunciation\":\"/kreˈpus.ku.lum/\",\"literal_meaning\":\"微光、黄昏\",\"chinese_explanation\":\"黄昏时分那种渐暗的微光。有说法认为词源与柴火燃烧的噼啪声有关——黄昏时分正是点燃篝火的时刻。\",\"english_approximation\":\"twilight, dusk, gloaming —— 但 crepusculum 带有\\\"正在暗淡中的光\\\"的流动感。\",\"emotion_tags\":[\"黄昏\",\"过渡\",\"微光\",\"宁静\"],\"usage_scenario\":\"描述傍晚天边最后一抹余晖、日与夜之间的过渡时刻。\",\"user_search_description\":\"天黑之前那种灰蒙蒙的、正在消失的光——不是白天也不是黑夜\",\"cultural_note\":\"英语中 crepuscular（黄昏的/朦胧的）即源于此。\"},{\"word\":\"Diaphanous（Διαφανής）\",\"language\":\"希腊语 → 英语借用\",\"pronunciation\":\"/daɪˈæfənəs/（英语）/ði.a.pʰa.nɛ̌ːs/（古希腊语）\",\"literal_meaning\":\"透明的、透光的、精致而模糊\",\"chinese_explanation\":\"一种极致的轻盈通透——可以形容丝绸的薄透、灵魂的纯真、意境的空明。不是简单的透明，而是\\\"光可以穿透从而使物体显得近乎不存在\\\"。\",\"english_approximation\":\"transparent, gossamer, ethereal —— transparent 太物理，ethereal 太灵性，diaphanous 刚好在两者之间。\",\"emotion_tags\":[\"轻盈\",\"纯真\",\"空明\",\"精致\",\"通透\"],\"usage_scenario\":\"描述薄纱窗帘在风中飘动、清晨的薄雾、一首诗的透明感。\",\"user_search_description\":\"薄到几乎看不见、光一打就透过去的那种轻盈透明——像晨雾一样\",\"cultural_note\":\"希腊语词根 dia-（通过）+ phainein（显示/发光），字面即\\\"透过而显现\\\"。\"},{\"word\":\"Lumen / Lucens\",\"language\":\"拉丁语\",\"pronunciation\":\"/ˈluː.men/ /ˈluː.kens/\",\"literal_meaning\":\"出自自然的微光\",\"chinese_explanation\":\"不是灯的光，而是自然世界中那种不耀眼的、温柔的光——纱窗微微透亮的感觉、夏夜萤火虫尾部那一闪一闪的光、云层边缘渗出的一线金光。\",\"english_approximation\":\"natural glimmer, gentle light —— 英语的 light 太笼统，lumen 特指\\\"来自自然本质的光\\\"。\",\"emotion_tags\":[\"光\",\"自然\",\"温柔\",\"宁静\",\"希望\"],\"usage_scenario\":\"萤火虫的光、月光透过云层的缝隙、日出前东方的第一抹微亮。\",\"user_search_description\":\"不是灯光，是大自然自己发出的那种温柔的光——像萤火虫一闪一闪的\",\"cultural_note\":\"物理学中的\\\"流明\\\"（光通量单位）即来自 lumen。\"},{\"word\":\"Sincero\",\"language\":\"拉丁语\",\"pronunciation\":\"/sinˈkeː.roː/\",\"literal_meaning\":\"干净的、纯洁的、实在的\",\"chinese_explanation\":\"真诚——不是策略性的坦诚，而是本质上的\\\"没有掺杂\\\"。sincerus 原意可能指\\\"没有蜡\\\"（sin cera），传说中不诚实的雕刻师用蜡来掩盖大理石上的瑕疵，真正诚实的作品则无需蜡来修补。\",\"english_approximation\":\"sincere, genuine, unadulterated —— sincere 已被日常化，sincero 更强调\\\"本质上的无杂质\\\"。\",\"emotion_tags\":[\"诚实\",\"纯粹\",\"本真\",\"无杂质\"],\"usage_scenario\":\"表达一种不掺假的感情、一件不做手脚的作品、一个纯粹的人。\",\"user_search_description\":\"不是嘴上说说的真心，是骨子里就是干净的、没掺任何杂质的真诚\",\"cultural_note\":\"sin cera（无蜡）的词源说法虽有争议，但已成为理解 sincere 的经典文化叙事。\"},{\"word\":\"Impermanentia\",\"language\":\"拉丁语\",\"pronunciation\":\"/im.per.maˈnen.ti.a/\",\"literal_meaning\":\"不持久性\",\"chinese_explanation\":\"万物与尘世的无恒久性——一切都在变化、流逝、不可挽留。与佛家的\\\"无常\\\"高度共鸣。\",\"english_approximation\":\"impermanence, transience —— impermanence 偏哲学，impermanentia 更具有存在论意义上的重量。\",\"emotion_tags\":[\"无常\",\"流逝\",\"存在\",\"宁静\",\"接纳\"],\"usage_scenario\":\"看到落花、老建筑被拆除、意识到青春不再时。\",\"user_search_description\":\"眼看着什么都留不住——花会谢、人会老、一切都在变——那种对'无常'的体会\",\"cultural_note\":\"来自 permaneo（我停留/持续）+ im-（否定前缀）。斯多葛哲学和佛教的核心概念。\"},{\"word\":\"Rosa\",\"language\":\"拉丁语\",\"pronunciation\":\"/ˈro.sa/\",\"literal_meaning\":\"玫瑰\",\"chinese_explanation\":\"不只是花——在欧洲古典文化中，玫瑰是爱与美之壮烈、尘世之幻灭、生命之无常的终极象征。玫瑰花期极短，瞬间枯萎，常被撒在逝者坟墓上。红色玫瑰也代表殉道者的血。玫瑰于欧洲文化，如同樱花于日本文化——在\\\"瞬间凋零\\\"中获得永恒。\",\"english_approximation\":\"rose —— 英语的 rose 完全没有古典欧洲赋予它的那一整套\\\"爱-死-永恒\\\"的文化叙事。\",\"emotion_tags\":[\"爱\",\"死亡\",\"无常\",\"美\",\"永恒\",\"古典\"],\"usage_scenario\":\"谈论爱情、死亡、牺牲、美的短暂性时。古罗马的\\\"玫瑰节日\\\"（Rosalia）即为纪念逝者。\",\"user_search_description\":\"像樱花对日本人的意义一样——玫瑰在欧洲文化里不只是花，是爱与死、短暂与永恒的所有含义\",\"cultural_note\":\"Rosa 来自古希腊语 ῥέω（rhéō，\\\"流动\\\"），指的是玫瑰香气的流动和花期的流逝。《埃拉加巴卢斯的玫瑰》一画中，漫天粉红到深红的玫瑰如云霞倾泻——是美与窒息并存的极致意象。\"},{\"word\":\"Eros（Ἔρως）\",\"language\":\"古希腊语\",\"pronunciation\":\"/ˈe.rɔːs/\",\"literal_meaning\":\"情欲、渴望\",\"chinese_explanation\":\"一种带有占有欲的、利己的爱——但不仅仅指向肉体和荷尔蒙。希腊人同样用 eros 来描述对知识和真理的渴望。亚里士多德的名言\\\"吾爱吾师，吾更爱真理\\\"中的\\\"爱\\\"就是 eros 的延伸。\",\"english_approximation\":\"passionate love, desire —— 英语的 erotic 窄化了 eros，只留下性的维度。\",\"emotion_tags\":[\"渴望\",\"激情\",\"爱\",\"占有\",\"求知\"],\"usage_scenario\":\"对恋人的热望、对真理的追求欲、让人燃烧的激情。\",\"user_search_description\":\"不是温柔的喜欢，是那种'我想要'——要你的人、要那个真理、要一切\",\"cultural_note\":\"柏拉图在《会饮篇》中将 eros 从一个肉体概念升华为对美和真理的追求。\"},{\"word\":\"Philos（Φίλος）\",\"language\":\"古希腊语\",\"pronunciation\":\"/ˈpʰi.los/\",\"literal_meaning\":\"友爱、喜爱\",\"chinese_explanation\":\"一种基于共同价值和互相欣赏的精神之爱。亚里士多德认为 philos 是最高形式的爱——不是血缘也不是欲望，而是两个灵魂因为\\\"彼此值得\\\"而相爱。对自己城邦和故土的爱也多用 philos 而非 agape。\",\"english_approximation\":\"friendship love, brotherly love —— 但 philos 涵盖的范围远超 friendship，包括了对智慧的追求（philosophia = 爱智慧）、对城邦的认同。\",\"emotion_tags\":[\"友谊\",\"精神\",\"认同\",\"城邦\",\"知己\"],\"usage_scenario\":\"描述挚友之间的深厚感情、对自己土地的认同感。\",\"user_search_description\":\"不是亲兄弟但比亲兄弟还亲——因为你的灵魂值得我爱，所以我把你当自己人\",\"cultural_note\":\"希腊语中大量复合词以 philo- 开头：philosophia（爱智慧）、philanthropos（爱人类）。\"},{\"word\":\"Storge（Στοργή）\",\"language\":\"古希腊语\",\"pronunciation\":\"/storˈɡɛ̌ː/\",\"literal_meaning\":\"亲情之爱、爱抚\",\"chinese_explanation\":\"一种本能的、无需理由的亲情——父母对子女、子女对父母之间自然流淌的关怀和依恋。不像 eros 那样汹涌，不像 philos 那样深思熟虑，storge 是一种\\\"天生就该如此\\\"的爱。\",\"english_approximation\":\"familial love, natural affection —— 英语没有一个词专门描述这种\\\"本能亲情\\\"。\",\"emotion_tags\":[\"亲情\",\"本能\",\"依恋\",\"温暖\",\"自然\"],\"usage_scenario\":\"父母抚育孩子、一个人对从小长大的家庭的依恋。\",\"user_search_description\":\"不需要原因、天生就会去爱的那种——父母对孩子、孩子对家\",\"cultural_note\":\"希腊四爱中 storge 是讨论最少的一个，但它是最\\\"自动化\\\"的爱。\"},{\"word\":\"Agape（Ἀγάπη）\",\"language\":\"古希腊语\",\"pronunciation\":\"/aˈɡa.pɛː/\",\"literal_meaning\":\"不弃与拯救之爱\",\"chinese_explanation\":\"超越了亲情、友情和情欲的\\\"大爱\\\"——一种不计回报、不放弃、愿为对方牺牲的拯救之爱。但它不是空洞的\\\"仁爱\\\"，agape 在基督教神哲学中拥有完整的本体论和形而上学地位。直观感受可参照《My Heart Will Go On》歌词——比生死更深。\",\"english_approximation\":\"unconditional love, divine love —— 英语借用了 agape 但一般只理解到\\\"上帝之爱\\\"的宗教层面。\",\"emotion_tags\":[\"大爱\",\"牺牲\",\"拯救\",\"永恒\",\"无条件的\"],\"usage_scenario\":\"最深层的舍己之爱、超越一切障碍的坚守。\",\"user_search_description\":\"不是喜欢也不是亲情——是那种'无论你怎样我都不会放弃你'的超越一切的爱\",\"cultural_note\":\"新约圣经原文中使用 agape 的次数远超 eros 和 storge。在希腊教父传统中，agape 被视为\\\"上帝的本质\\\"。\"},{\"word\":\"Logos（Λόγος）\",\"language\":\"古希腊语\",\"pronunciation\":\"/ˈlo.ɡos/\",\"literal_meaning\":\"言辞、理念、理性、道\",\"chinese_explanation\":\"中文用一个\\\"道\\\"字便可以指代其大致意涵。λόγος 既是语言和理性，又是万物运行的根本原理。在环地中海神哲学传统中，λόγος 的地位相当于\\\"道\\\"在中国古典哲学中的地位——是万物的本源和秩序。在基督教传统中，λόγος 就是\\\"太初有道\\\"的那个\\\"道\\\"。\",\"english_approximation\":\"word, reason, principle —— 但每一种翻译都是管窥，没有英语单词能承载 λόγος 的全部。\",\"emotion_tags\":[\"理性\",\"宇宙\",\"道\",\"本源\",\"哲学\"],\"usage_scenario\":\"哲学讨论、神学论述中表达\\\"宇宙的理性秩序\\\"。\",\"user_search_description\":\"中文'道'的那种感觉——不是道理，是宇宙那个最深层的、让一切运转的根本东西\",\"cultural_note\":\"《约翰福音》开篇\\\"Ἐν ἀρχῇ ἦν ὁ λόγος\\\"（太初有道）是西方文明史上最有名的一句话。\"},{\"word\":\"Charis / Gratia / Grace（Χάρις）\",\"language\":\"古希腊语 → 拉丁语 → 英语\",\"pronunciation\":\"/ˈkʰa.ris/ /ˈɡraː.ti.a/ /ɡreɪs/\",\"literal_meaning\":\"慈悲、恩宠、优雅\",\"chinese_explanation\":\"一个横跨三层含义的词——既是神对人的无偿恩宠和慈悲，又指人本身的优雅风度和美丽。在古希腊神话中，Charites（美惠三女神）就是优雅与美丽的化身。它既可以用来敬称高位者（Your Grace），又可以指一种不求回报的善意。\",\"english_approximation\":\"grace, mercy, elegance —— grace 是英语中最接近的，但缺少希腊/拉丁原文中那种\\\"神与人之间流动的恩典通道\\\"的维度。\",\"emotion_tags\":[\"优雅\",\"恩典\",\"慈悲\",\"美\",\"神圣\"],\"usage_scenario\":\"宗教语境中表达\\\"蒙恩\\\"、日常中赞美一个人的气质优雅。\",\"user_search_description\":\"不只是长得好看或者有礼貌，而是一种有点神圣感的、从里到外散发出来的优雅和温暖\",\"cultural_note\":\"拉丁语 Gratia Tibi 意为\\\"愿恩典与你同在\\\"，类似中文的\\\"感恩\\\"但更有宗教的庄严感。\"},{\"word\":\"Drift（诗意用法）\",\"language\":\"英语\",\"pronunciation\":\"/drɪft/\",\"literal_meaning\":\"漂流、瞬移\",\"chinese_explanation\":\"在诗歌中可以用来描述雪花如同漂流在河面上一样在空中飞舞——不是直直落下，而是在空气中蜿蜒飘荡。\",\"english_approximation\":\"to float, to be carried by wind —— 但 drift 在诗中的意境同时包含了\\\"无目的\\\"和\\\"优雅飘荡\\\"两层。\",\"emotion_tags\":[\"飘荡\",\"诗意\",\"雪\",\"无目的\",\"优美\"],\"usage_scenario\":\"描述雪、花瓣、思绪在空中的飘动。\",\"user_search_description\":\"像雪花那样不是垂直落下来，而是在空中飘来飘去、像在河面上漂流一样\",\"cultural_note\":\"中文\\\"浪迹江湖\\\"可意译为 \\\"like drift along all rivers and lakes\\\"。\"},{\"word\":\"Moan（风的低吟）\",\"language\":\"英语\",\"pronunciation\":\"/moʊn/\",\"literal_meaning\":\"呻吟、呜咽\",\"chinese_explanation\":\"风吹过时发出的那种低沉的、如泣如诉的声音——如同\\\"风飒飒兮木萧萧\\\"。不是噪音，而是一种带有哀伤情调的自然的低吟。\",\"english_approximation\":\"wail, groan —— 但 moan 在描述风声时带有一种拟人化的悲伤情绪，更像是自然在对人类倾诉。\",\"emotion_tags\":[\"风\",\"哀伤\",\"自然\",\"声音\",\"诗意\"],\"usage_scenario\":\"描述秋夜风声、老宅中门缝透进来的风。\",\"user_search_description\":\"风吹过来的时候像在叹气、像在低低地哭——不是噪音，是风的情绪\",\"cultural_note\":\"与 whistle 形成对比——moan 是低沉呜咽，whistle 是尖锐哨音。\"},{\"word\":\"Whistle（风的哨音）\",\"language\":\"英语\",\"pronunciation\":\"/ˈwɪsəl/\",\"literal_meaning\":\"吹哨、鸣笛\",\"chinese_explanation\":\"风穿过窄缝时发出的尖锐哨音般的呼啸声——可以是冬天夜里窗户缝中尖锐的风声，也可以是水壶烧开的尖叫。\",\"english_approximation\":\"shriek, screech —— 但 whistle 作为风的描述带有一种\\\"自然在发信号\\\"的通感。\",\"emotion_tags\":[\"风\",\"尖啸\",\"自然\",\"声音\"],\"usage_scenario\":\"暴风雪中的风声、火车驶过的呼啸。\",\"user_search_description\":\"风穿过门缝窗缝时那种尖尖的啸声——像在吹哨子\",\"cultural_note\":\"英语中 moan/whistle/howling 构成了一套完整的\\\"风的声音谱系\\\"。\"},{\"word\":\"Outcast state\",\"language\":\"英语\",\"pronunciation\":\"/ˈaʊtkæst steɪt/\",\"literal_meaning\":\"被放逐者的状态/王国\",\"chinese_explanation\":\"莎士比亚用过这个短语。它不只是\\\"被社会抛弃\\\"，而是指一个人在放逐中建立起的自己的精神王国——身在江湖，心有所属。中文的\\\"江湖\\\"是对这个词最精彩的对译。\",\"english_approximation\":\"exile, outsider status —— 但 outcast state 带有\\\"虽被放逐但自成世界\\\"的傲骨。\",\"emotion_tags\":[\"放逐\",\"江湖\",\"边缘\",\"自由\",\"孤独\"],\"usage_scenario\":\"描述那些脱离主流社会、在自己构建的小宇宙中生活的边缘人。\",\"user_search_description\":\"不在主流里混了——自己建立了自己的世界。有点悲壮、有点自由。中文叫江湖。\",\"cultural_note\":\"莎士比亚使用于 Sonnet 29。\"},{\"word\":\"Peace（深层含义）\",\"language\":\"英语\",\"pronunciation\":\"/piːs/\",\"literal_meaning\":\"和平、平安\",\"chinese_explanation\":\"除了\\\"没有战争\\\"和\\\"平安\\\"之外，peace 还可以表示内心满溢的、带有幸福感的平静与平和——一种人与人彼此相爱带来的和谐。乐曲中也有 peace（安详的乐章）。\",\"english_approximation\":\"—（此条目解释的是英语自身的深层语义）\",\"emotion_tags\":[\"平静\",\"幸福\",\"和谐\",\"爱\",\"安详\"],\"usage_scenario\":\"内心极其平静满足的时刻、人与人之间达成和解后的那种\\\"终于好了\\\"的感受。\",\"user_search_description\":\"不是没有战争的那种和平，而是心里满到溢出来的那种安静和幸福——什么都好好的\",\"cultural_note\":\"很多英语母语者自己也未必意识到 peace 的这个深层含义——它常被简化为反义词 of war。\"},{\"word\":\"Joy（深层含义）\",\"language\":\"英语\",\"pronunciation\":\"/dʒɔɪ/\",\"literal_meaning\":\"高兴\",\"chinese_explanation\":\"不是简单的 happy——joy 更像你在听一首大调歌曲时感受到的那种带有感激和感怀意味的幸福。比 happiness 更厚重深沉，比 pleasure 更持久。\",\"english_approximation\":\"—（此条目解释的是英语自身的深层语义）\",\"emotion_tags\":[\"喜悦\",\"感激\",\"深沉\",\"幸福\",\"音乐\"],\"usage_scenario\":\"感恩节家人团聚、看到新生儿时那种超出\\\"开心\\\"的深沉喜悦。\",\"user_search_description\":\"不是嘻嘻哈哈那种开心，而是心里特别厚实、特别感恩的那种幸福——想哭的那种好\",\"cultural_note\":\"在圣诞颂歌《Joy to the World》中，如果换成 happiness 会立刻失去全部庄严感。\"},{\"word\":\"Sorrow（深层含义）\",\"language\":\"英语\",\"pronunciation\":\"/ˈsɒroʊ/\",\"literal_meaning\":\"悲伤\",\"chinese_explanation\":\"sadness 的文学化形式——比 sadness 严肃和深沉得多。多指刻骨铭心或淡而难散的悲伤、深厚的苦难和悲剧文学中的情绪。\",\"english_approximation\":\"—（此条目解释的是英语自身的深层语义）\",\"emotion_tags\":[\"悲伤\",\"深沉\",\"苦难\",\"文学\",\"悲剧\"],\"usage_scenario\":\"描述丧亲之痛、悲剧故事的观后感、一种挥之不去的深层哀伤。\",\"user_search_description\":\"不是日常不开心的那种 sad——是刻进骨头里的、挥之不去的、像一首悲歌那样的伤心\",\"cultural_note\":\"在英语文学中 sorrow 和 joy 是一对经典的\\\"情感对子\\\"。\"},{\"word\":\"Tender\",\"language\":\"英语\",\"pronunciation\":\"/ˈtɛndər/\",\"literal_meaning\":\"嫩、温柔\",\"chinese_explanation\":\"一种微妙而难以准确翻译的温柔——不只是对人的态度，更多是形容一个场景、一个瞬间给你带来的那种暖暖的、让人嘴角不自觉微微上扬的感觉。像是温过的毛巾、黄昏时的一句轻声话。\",\"english_approximation\":\"gentle, soft —— 但 tender 带有一种脆弱感和被保护的冲动。\",\"emotion_tags\":[\"温柔\",\"暖\",\"脆弱\",\"保护\",\"细腻\"],\"usage_scenario\":\"描述一个人照顾另一个人的画面、恋人之间那个小心翼翼的眼神。\",\"user_search_description\":\"不是普通的温柔——是一种让你心里一软、想好好保护对方（或这个时刻）的微妙感觉\",\"cultural_note\":\"tender 也指\\\"肉的嫩\\\"，这种从物理到情感的延伸在英语中是自然而微妙的。\"},{\"word\":\"Melancholy\",\"language\":\"英语\",\"pronunciation\":\"/ˈmɛlənkɒli/\",\"literal_meaning\":\"忧郁\",\"chinese_explanation\":\"一种略带怀念的伤感——那些剪不断理还乱的关系和往事带来的痛感里，其实还藏着一丝籍慰。不是抑郁症，而是\\\"带着甜味的悲伤\\\"。\",\"english_approximation\":\"sadness with nostalgia —— sadness 太一般，depression 太临床。\",\"emotion_tags\":[\"忧郁\",\"怀旧\",\"伤感\",\"甜美\",\"回忆\"],\"usage_scenario\":\"在雨天想起从前、翻老照片时的复杂心情。\",\"user_search_description\":\"伤心里面居然有一点点甜——想起来会痛，但又不想忘记的那种感觉\",\"cultural_note\":\"源自希腊语 melas（黑）+ chole（胆汁），古代医学认为忧郁是黑胆汁过多引起的。\"},{\"word\":\"Yud Zam（ཡུད་ཙམ）\",\"language\":\"藏语\",\"pronunciation\":\"/jud zam/（近似汉语拼音）\",\"literal_meaning\":\"一瞬间的月光\",\"chinese_explanation\":\"云层散开又飞快合拢的那一瞬间漏出来的一点点月光——极其短暂、极其珍贵的光。\",\"english_approximation\":\"a fleeting glimpse of moonlight through parting clouds\",\"emotion_tags\":[\"瞬间\",\"月光\",\"珍贵\",\"藏族\",\"自然\"],\"usage_scenario\":\"多云的夜晚，云刚好散开一道缝，月光洒下来几秒钟就又消失了。\",\"user_search_description\":\"云刚好裂开一道缝，月光漏下来一丢丢，眨个眼就又没了\",\"cultural_note\":\"藏传佛教文化中对自然现象的敏锐观察和命名。\"},{\"word\":\"Cocorico\",\"language\":\"法语\",\"pronunciation\":\"/kɔkɔʁiko/\",\"literal_meaning\":\"喔喔喔（鸡叫声）\",\"chinese_explanation\":\"高卢雄鸡是法国的象征，因此 cocorico 除了表示公鸡打鸣之外，还用于表达法国式的爱国骄傲和扬眉吐气——在任何法国人获胜或法国成就会被提及的地方，都可以听到 cocorico。极难翻译成其他语言。\",\"english_approximation\":\"cock-a-doodle-doo + patriotic pride —— 英语的鸡叫声完全没有爱国色彩。\",\"emotion_tags\":[\"骄傲\",\"爱国\",\"欢呼\",\"法国\"],\"usage_scenario\":\"法国运动员在奥运夺金时、法国发明被全球认可时。\",\"user_search_description\":\"法国人觉得自己特别牛的时候那种'喔喔喔我们大法国！'的自豪感\",\"cultural_note\":\"常见于法国媒体报道——比如\\\"奥运会快报：cocorico，法国运动健儿今晨连夺三银！\"},{\"word\":\"Pioupiesque\",\"language\":\"法语（兰波自创词）\",\"pronunciation\":\"/pjupjɛsk/\",\"literal_meaning\":\"小鸡般的\",\"chinese_explanation\":\"诗人兰波发明的词——由 pioupiou（小鸡叫声）派生，用来形容小男孩像小鸡一样排着队、雄赳赳气昂昂地喊着番号走路的可爱样子。也被引申为\\\"童子军般的\\\"和\\\"表现本真的\\\"。\",\"english_approximation\":\"chick-like, boy-scout-ish —— 但 pioupiesque 同时包含了雄赳赳的可爱和本真的稚气。\",\"emotion_tags\":[\"可爱\",\"童真\",\"朝气\",\"兰波\"],\"usage_scenario\":\"描述一群小男孩排队走路时的画面。\",\"user_search_description\":\"一群小男孩排着队、挺着小胸膛往前走的那种可爱又有点好笑的画面\",\"cultural_note\":\"兰波（Rimbaud）——法国天才诗人，17 岁写下传世之作。pioupiesque 是他发明的诸多词汇之一。\"},{\"word\":\"Ityphallique\",\"language\":\"法语\",\"pronunciation\":\"/itifalik/\",\"literal_meaning\":\"刻意凸显勃起的、生殖崇拜式的\",\"chinese_explanation\":\"词源来自古希腊人对古埃及雕像生殖崇拜的描写——用来形容雕像和绘画中刻意凸显男性特征的风格。但早熟的少年诗人兰波将它转用于描写\\\"丁如嫪毐、心在远方的忧郁少年\\\"，赋予了一种耽美且孤独的画风。\",\"english_approximation\":\"ithyphallic —— 英语中这个词几乎只在考古学语境下使用，完全没有兰波赋予的那种诗意美感。\",\"emotion_tags\":[\"耽美\",\"少年\",\"孤独\",\"兰波\",\"古典艺术\"],\"usage_scenario\":\"文学分析中描述兰波笔下的少年形象、研究古希腊-古埃及艺术。\",\"user_search_description\":\"不是医学也不是色情——是一种古典雕像式的、带有忧郁和远方的少年之美\",\"cultural_note\":\"兰波和魏尔伦是法国文学史上最著名的同性伴侣之一——相爱相杀（真的拿刀砍的那种）。\"},{\"word\":\"Yakamoz\",\"language\":\"土耳其语\",\"pronunciation\":\"/jakaˈmoz/\",\"literal_meaning\":\"海面上的粼光\",\"chinese_explanation\":\"水面上反射的日光或月光——\\\"浮光跃金\\\"。尤其指海面上那种闪烁的、流动的光斑。土耳其语中最优美的词汇之一。\",\"english_approximation\":\"sea sparkle, phosphorescence, glittering reflection on water —— 英语没有单一对应词。\",\"emotion_tags\":[\"海\",\"光\",\"闪烁\",\"浪漫\",\"土耳其\"],\"usage_scenario\":\"黄昏或月夜站在海边看到水面上闪烁的光。\",\"user_search_description\":\"海面上一闪一闪的、像碎金子一样的反光——浮光跃金\",\"cultural_note\":\"与瑞典语 mångata（月亮在水面上的路）是一对姐妹词——一个强调闪烁，一个强调\\\"路\\\"的形状。\"},{\"word\":\"Vuslat\",\"language\":\"土耳其语\",\"pronunciation\":\"/vusˈlat/\",\"literal_meaning\":\"与爱人的会面\",\"chinese_explanation\":\"仅指与心爱之人的约会或重逢——这个词本身发音甜美，说出来就带着一种期待和甜蜜。不是普通的 meeting，是\\\"终于见到你了\\\"的那种满怀期待的见面。\",\"english_approximation\":\"rendezvous with a lover —— 但 vuslat 自带期待的甜蜜感。\",\"emotion_tags\":[\"期待\",\"甜蜜\",\"约会\",\"爱情\",\"土耳其\"],\"usage_scenario\":\"和恋人约好见面、久别的爱人终于重逢时。\",\"user_search_description\":\"一想到要见到 ta 了，心里甜甜的那种期待——这个词念出来就是甜的\",\"cultural_note\":\"阿拉伯语借词，在土耳其语中保留了极其优美的音韵。\"},{\"word\":\"Hüzün\",\"language\":\"土耳其语\",\"pronunciation\":\"/hyˈzyn/\",\"literal_meaning\":\"忧伤、呼愁\",\"chinese_explanation\":\"奥尔罕·帕慕克（诺贝尔文学奖得主）小说中反复出现的情感词——中文被译为\\\"呼愁\\\"，非常贴切。Hüzün 不是普通的伤心（üzüntü），而是一种\\\"剪不断理还乱\\\"的如无边丝雨一样的愁绪，混合了对逝去时光和文明的集体哀悼。\",\"english_approximation\":\"melancholy, sorrow —— 但 hüzün 在帕慕克的笔下特指\\\"伊斯坦布尔的城市灵魂\\\"，是对奥斯曼帝国辉煌不再的集体忧伤。\",\"emotion_tags\":[\"忧伤\",\"怀旧\",\"集体记忆\",\"伊斯坦布尔\",\"帕慕克\"],\"usage_scenario\":\"在伊斯坦布尔的黄昏中感到的那种城市级别的忧愁。\",\"user_search_description\":\"不是个人的伤心，是整个城市、整个文明退潮之后留下的一种灰蒙蒙的愁绪\",\"cultural_note\":\"帕慕克在《伊斯坦布尔：一座城市的记忆》中用了几百页来定义 hüzün。\"},{\"word\":\"Gurbet\",\"language\":\"土耳其语\",\"pronunciation\":\"/ɡuɾˈbet/\",\"literal_meaning\":\"异乡、海外\",\"chinese_explanation\":\"不是中性的\\\"外国\\\"或\\\"境外\\\"——gurbet 天然带有一层\\\"独在异乡为异客\\\"的忧伤和对故土的 nostalgia。一个人在 gurbet 中就是漂泊羁旅客（gurbetçi）。\",\"english_approximation\":\"foreign land, exile —— 但 gurbet 不一定是被迫的，也可以是自愿离乡后体会到的孤独。\",\"emotion_tags\":[\"异乡\",\"孤独\",\"乡愁\",\"漂泊\",\"土耳其\"],\"usage_scenario\":\"在海外生活想念家乡时、听到家乡的歌曲心头一酸。\",\"user_search_description\":\"在国外待久了，一到过节就特别想家——那种'回不去但也放不下'的异乡感\",\"cultural_note\":\"加后缀 -çi 变成 gurbetçi（漂泊羁旅客）——这是在德国等地的土耳其移民群体的集体身份标签。\"},{\"word\":\"Hasret\",\"language\":\"土耳其语\",\"pronunciation\":\"/hasˈɾet/\",\"literal_meaning\":\"思念\",\"chinese_explanation\":\"一种带着淡淡怀旧伤感的思念——比土耳其语中另一个表示思念的词 özlem 更深一层，混合了对过去的淡淡忧伤和对重逢的期盼。\",\"english_approximation\":\"longing with nostalgia —— 单纯 longing 不够。\",\"emotion_tags\":[\"思念\",\"怀旧\",\"伤感\",\"期盼\"],\"usage_scenario\":\"想念远方的亲人、回忆已经逝去的美好时光。\",\"user_search_description\":\"不是普通的想，是想里面带着一点点忧伤和很多很多的盼头\",\"cultural_note\":\"与罗马尼亚语 dor、葡萄牙语 saudade 有亲缘关系但情感色调不同——hasret 更温柔。\"},{\"word\":\"Kısmet\",\"language\":\"土耳其语\",\"pronunciation\":\"/kɯsˈmet/\",\"literal_meaning\":\"缘分、福气\",\"chinese_explanation\":\"交上一个可遇不可求的好运时就可以说 \\\"Kısmet oldu\\\"——上天安排的、求不来的好运气。在汉语中\\\"久仰大名，今日终于得缘一见\\\"这样的语境下，一句 \\\"Kısmet oldu\\\" 最合适。\",\"english_approximation\":\"fate, fortune, serendipity —— 但 kısmet 带有\\\"被上天安排好\\\"的宿命感和感恩。\",\"emotion_tags\":[\"缘分\",\"命运\",\"感恩\",\"好运\"],\"usage_scenario\":\"偶然遇到多年不见的老友、刚好拿到最后一个位置时。\",\"user_search_description\":\"不是自己努力来的——是老天安排好的缘分和运气，遇到了说一句'缘啊'\",\"cultural_note\":\"来自阿拉伯语 qisma（分配/份额），在土耳其日常使用频率极高。\"},{\"word\":\"Yazgı\",\"language\":\"土耳其语\",\"pronunciation\":\"/jazˈɡɯ/\",\"literal_meaning\":\"命运\",\"chinese_explanation\":\"这个词的美感在于它的词根是 yazmak（\\\"写\\\"）——命运就是\\\"被写好的东西\\\"。如同中国传统信仰中\\\"人的生死簿早就写好了一样\\\"，带着\\\"一饮一啄莫非前定\\\"、\\\"万般皆是命半点不由人\\\"的无奈与悲剧感。\",\"english_approximation\":\"destiny, fate —— 但 yazgı 的\\\"被书写感\\\"在英语中完全丢失。\",\"emotion_tags\":[\"命运\",\"注定\",\"无奈\",\"悲剧感\",\"书写\"],\"usage_scenario\":\"面对无法改变的命运时、感叹人生的剧本早已写好。\",\"user_search_description\":\"命运不是随机发生的——是早就'写'好了的。你只是在按剧本走。\",\"cultural_note\":\"令人联想到济慈的墓志铭：\\\"此地长眠者，声名水上书\\\"（Here lies one whose name was writ in water）。\"},{\"word\":\"Fingerspitzengefühl\",\"language\":\"德语\",\"pronunciation\":\"/ˈfɪŋɐˌʃpɪtsənɡəˌfyːl/\",\"literal_meaning\":\"指尖的感觉\",\"chinese_explanation\":\"用指尖感受事物的那种细微而敏锐的理解力和分寸感——不是理性分析，而是一种从手指传来的直觉式的精准把握。在社交、谈判、艺术创作中都需要 Fingerspitzengefühl。\",\"english_approximation\":\"tact, intuitive sensitivity, delicate touch —— 英语的 tact 只覆盖了社交层面。\",\"emotion_tags\":[\"直觉\",\"敏锐\",\"细腻\",\"分寸\",\"触觉\"],\"usage_scenario\":\"知道什么时候该说什么话、处理微妙的谈判、弹钢琴时的触键。\",\"user_search_description\":\"不是用脑子想明白的，是用指尖感觉出来的那种精确和分寸——不用量就知道多少\",\"cultural_note\":\"Fingerspitzen（指尖）+ Gefühl（感觉/感受），德语触觉智慧的代表词。\"},{\"word\":\"Jein\",\"language\":\"德语\",\"pronunciation\":\"/jaɪn/\",\"literal_meaning\":\"是又不是\",\"chinese_explanation\":\"Ja（是）+ Nein（否）的组合——用来表达一种既不肯定也不否定、既对也不对、很难说的微妙态度。相当于\\\"嗯……是吧也不是……\\\"。\",\"english_approximation\":\"yes and no, sort of —— 没有一个词能像 jein 这样紧凑地表达矛盾态度。\",\"emotion_tags\":[\"矛盾\",\"模糊\",\"犹豫\",\"微妙\"],\"usage_scenario\":\"被问到是否喜欢一个东西，你觉得还行但又不完全喜欢时。\",\"user_search_description\":\"你问我喜不喜欢——说喜欢吧也不是，说不喜欢吧也不是，就是'嗯……是吧也不是……'\",\"cultural_note\":\"德语中极少见的\\\"非复合\\\"式新词创造——把一个肯定词和一个否定词直接粘在一起。\"},{\"word\":\"Lampenfieber\",\"language\":\"德语\",\"pronunciation\":\"/ˈlampənˌfiːbɐ/\",\"literal_meaning\":\"灯光发烧\",\"chinese_explanation\":\"站在聚光灯下脸颊发烫、紧张到发抖的状态——怯场、舞台恐惧。用\\\"灯光+发烧\\\"来描述这种生理和心理反应。\",\"english_approximation\":\"stage fright —— stage fright 是抽象概念，Lampenfieber 用\\\"发烧\\\"把它身体化了。\",\"emotion_tags\":[\"紧张\",\"怯场\",\"舞台\",\"发烧感\"],\"usage_scenario\":\"上台演讲前手心出汗、表演前心跳加速。\",\"user_search_description\":\"要上台了，灯光一照脸上发烫、心跳咚咚咚的那种紧张\",\"cultural_note\":\"Lampe（灯）+ Fieber（发烧），德语擅长用身体感受来比喻心理状态。\"},{\"word\":\"Kitsch\",\"language\":\"德语\",\"pronunciation\":\"/kɪtʃ/\",\"literal_meaning\":\"媚俗\",\"chinese_explanation\":\"过于感性的、廉价的、矫揉造作的艺术或设计——那幅画着流泪小丑的天鹅绒画、那个心形装饰品。Kitsch 不是\\\"坏艺术\\\"，而是一种特定的\\\"过度感性\\\"的审美范畴。\",\"english_approximation\":\"kitsch（英语已直接借用），tacky, sentimental art —— 英语的 tacky 偏向\\\"廉价\\\"，kitsch 指的是\\\"情感过载\\\"。\",\"emotion_tags\":[\"媚俗\",\"廉价\",\"感性\",\"艺术\",\"讽刺\"],\"usage_scenario\":\"描述过于甜腻的设计、用力过猛的煽情作品。\",\"user_search_description\":\"不是丑也不是差，是那种太甜了太煽了、情感用过量了的艺术——看了有点尴尬\",\"cultural_note\":\"这个德语词已被英语全球借用。米兰·昆德拉在《不能承受的生命之轻》中对 kitsch 做了经典分析。\"},{\"word\":\"Lebenslangerschicksalsschatz\",\"language\":\"德语\",\"pronunciation\":\"/ˈleːbn̩sˌlaŋɐˌʃɪkzaːlsˌʃats/\",\"literal_meaning\":\"一生的命运之宝\",\"chinese_explanation\":\"一个被美剧《老爸老妈浪漫史》带火的超长复合词。Lebenslanger（一生的）+ Schicksal（命运）+ Schatz（宝贝）=\\\"命中注定要珍惜一生的人\\\"。字幕组译为\\\"天作之合\\\"只保留了\\\"命运\\\"这层，漏掉了\\\"一生\\\"和\\\"宝贝\\\"。\",\"english_approximation\":\"lifelong treasure of destiny —— 英语无法用一个词表达。\",\"emotion_tags\":[\"真爱\",\"命运\",\"一生\",\"珍贵\"],\"usage_scenario\":\"描述那个命中注定要和你走一辈子的人。\",\"user_search_description\":\"你是我命中注定的、我要宝贝一辈子的那个人——不是'天作之合'，比那更重\",\"cultural_note\":\"德语超长复合词的极致——8 个音节浓缩了\\\"一生+命运+宝贝\\\"三重含义。\"},{\"word\":\"Gottesfrieden\",\"language\":\"德语\",\"pronunciation\":\"/ˈɡɔtəsˌfʁiːdn̩/\",\"literal_meaning\":\"上帝的和平\",\"chinese_explanation\":\"不是空洞的宗教口号。特指中世纪早期法国各大教会（之后在德国被进一步法制化）为限制骑士私战、保护平民和教会财产而发起的和平运动。规定一周内某日不能打斗、节假日不可开战、不能摧毁桥梁和谷仓、不能杀害平民。是人类历史上对\\\"用规则来维护和平\\\"的初次伟大探索。\",\"english_approximation\":\"Peace of God, Truce of God —— 英语的对应词只停留在历史学术层面。\",\"emotion_tags\":[\"和平\",\"历史\",\"规则\",\"人性\",\"希望\"],\"usage_scenario\":\"讨论中世纪历史、战争的限制、人类追求和平的早期实践。\",\"user_search_description\":\"在谁拳头大谁说了算的年代，有一群人硬是用规矩约束住了暴力——人类探索和平的第一步\",\"cultural_note\":\"在德国被严格化后称为 Landfrieden（土地和平），被认为是近现代国际反战法律的雏形。\"},{\"word\":\"Oborozukiyo（胧月夜）\",\"language\":\"日语\",\"pronunciation\":\"/oborozɯkijo/\",\"literal_meaning\":\"朦胧月夜的夜晚\",\"chinese_explanation\":\"月亮被薄云遮住、发出柔和朦胧光芒的夜晚——不是清冷的满月，也不是漆黑无月，而是那种暧昧的、如梦似幻的月光之夜。\",\"english_approximation\":\"hazy moonlit night —— 英语只能用冗长的描述。\",\"emotion_tags\":[\"朦胧\",\"月光\",\"春夜\",\"日本美学\"],\"usage_scenario\":\"春天夜晚窗外透进来的朦胧月光。\",\"user_search_description\":\"月亮不是明晃晃的，而是被一层薄云罩着、柔柔地发光的夜晚\",\"cultural_note\":\"出自传统日本和歌意象。\"},{\"word\":\"Hanafubuki（花吹雪）\",\"language\":\"日语\",\"pronunciation\":\"/hanafɯbɯki/\",\"literal_meaning\":\"花之暴风雪\",\"chinese_explanation\":\"樱花花瓣被风吹落时如同暴风雪一般漫天飞舞的壮观景象——不是一朵两朵，而是整个天空都是樱花。ふぶき（吹雪）本意是暴风雪，加上花就是\\\"花的暴风雪\\\"。\",\"english_approximation\":\"cherry blossom blizzard —— blizzard 是冰雪的，用来形容花显得突兀。\",\"emotion_tags\":[\"樱花\",\"壮观\",\"短暂\",\"日本美学\"],\"usage_scenario\":\"樱花季大风过后花瓣漫天的景象。\",\"user_search_description\":\"樱花不是一片片飘的——是大风一吹像暴风雪一样铺天盖地往下飞的那种壮观\",\"cultural_note\":\"将冬季的暴风雪意象移植到春季的樱花上，是日语自然词汇的经典手法。\"},{\"word\":\"Yukigeshō（雪化粧）\",\"language\":\"日语\",\"pronunciation\":\"/jɯkiɡeɕoː/\",\"literal_meaning\":\"雪之化妆\",\"chinese_explanation\":\"下雪后万物被白雪覆盖，如同披上了圣洁的银色妆容——大地被雪\\\"化了妆\\\"。\",\"english_approximation\":\"snow-covered landscape —— 完全失去了\\\"化妆/装扮\\\"的拟人诗意。\",\"emotion_tags\":[\"雪\",\"纯白\",\"圣洁\",\"自然\",\"日本美学\"],\"usage_scenario\":\"清晨推开窗看到院子、屋顶、树都被雪覆盖的时候。\",\"user_search_description\":\"下了雪以后整个世界都像被细细地化了一层银色的妆——安静、圣洁\",\"cultural_note\":\"化粧在日常中意思是化妆/打扮，用在大地上就是将雪人格化为一位化妆师。\"},{\"word\":\"Koigoromo（恋衣）\",\"language\":\"日语\",\"pronunciation\":\"/koiɡoɾomo/\",\"literal_meaning\":\"将恋慕穿在身上\",\"chinese_explanation\":\"恋慕之情如此深沉，以至于就像将这份\\\"恋\\\"当成衣服穿在了身上一样——无法脱掉，随身携带。主要见于日本最古老的和歌集《万叶集》。\",\"english_approximation\":\"love worn like clothing —— 英语直译看起来很奇怪。\",\"emotion_tags\":[\"恋慕\",\"沉浸\",\"深情\",\"和歌\"],\"usage_scenario\":\"思念一个人到无时无刻不被包围的程度。\",\"user_search_description\":\"对你的想念像穿在身上的衣服一样，走到哪都跟着我，怎么也脱不掉\",\"cultural_note\":\"万叶集时代的恋歌中经常出现的意象——\\\"衣\\\"和\\\"恋\\\"在古代日语中谐音，形成双关。\"},{\"word\":\"Kashinfū（花信風）\",\"language\":\"日语\",\"pronunciation\":\"/kaɕiɱɸɯː/\",\"literal_meaning\":\"花的信息之风\",\"chinese_explanation\":\"传递\\\"花开了\\\"这个消息的风——当春风带来了花香或花瓣，你知道某个地方的花已经盛开了。风是花的信使。\",\"english_approximation\":\"wind that announces the blooming of flowers\",\"emotion_tags\":[\"春天\",\"花\",\"风\",\"消息\",\"期待\"],\"usage_scenario\":\"春天闻到风中有花香、看到风中夹着花瓣时。\",\"user_search_description\":\"风吹过来带着花香——不是花开了你才知道，是风先告诉你的\",\"cultural_note\":\"来自中国二十四番花信风的传统，传入日本后被保留并发扬。\"},{\"word\":\"Haruasashi（春浅し）\",\"language\":\"日语\",\"pronunciation\":\"/haɾɯasai/\",\"literal_meaning\":\"春天还很浅\",\"chinese_explanation\":\"早春——冬天只有黑白两色，春向夏推移时颜色越来越丰富，但在早春时还是\\\"浅\\\"的——只是淡淡的彩。春天的深度还不够。\",\"english_approximation\":\"early spring —— 完全丢失了\\\"深浅\\\"这个色彩维度的诗意。\",\"emotion_tags\":[\"早春\",\"浅色\",\"等待\",\"细腻\",\"日本美学\"],\"usage_scenario\":\"二月末三月初，树枝刚开始冒出嫩绿的芽，但花朵还没有盛放。\",\"user_search_description\":\"春天来了但还不够——花还没全开，颜色还是淡淡的，像是一杯泡得还不够浓的茶\",\"cultural_note\":\"日本人认为冬天的世界是黑白的，夏天是浓墨重彩的，而早春是\\\"浅彩\\\"——这种对季节色彩递进的细致观察令人惊叹。\"},{\"word\":\"Spokoiny（Спокойный）\",\"language\":\"俄语\",\"pronunciation\":\"/spɐˈkojnɨj/\",\"literal_meaning\":\"宁静的\",\"chinese_explanation\":\"本意是宁静、平静——但在某些语境下带有一丝微妙而难以描述的忧伤。像是在雪夜独自站在楼顶点燃一根烟，四周寂静只剩风声的那种感觉。宁静里有空隙。\",\"english_approximation\":\"calm, tranquil —— 但 spokoiny 的宁静是俄罗斯式的——在这宁静的深处藏着一丝哀伤。\",\"emotion_tags\":[\"宁静\",\"忧伤\",\"俄罗斯\",\"雪\",\"孤独\"],\"usage_scenario\":\"俄罗斯冬夜的寂静时刻。\",\"user_search_description\":\"不是普通的安静，是在雪夜的楼顶那种静——静得你听见了自己的呼吸和一点点说不清道不明的伤心\",\"cultural_note\":\"与 toska 具有亲缘关系——spokoiny 是一种表面平静、底下微澜的状态。\"},{\"word\":\"Rodnoy Gorod（Родной город）\",\"language\":\"俄语\",\"pronunciation\":\"/rɐdˈnoj ˈɡorət/\",\"literal_meaning\":\"故乡城市\",\"chinese_explanation\":\"Родной 同时有\\\"故乡的\\\"和\\\"亲爱的、亲密的\\\"两层意思，所以这个词不只是\\\"出生的城市\\\"，更是\\\"亲爱的城市\\\"——每次回到家乡的路上，脑子里蹦出的是 родной 的亲切感，而非中文\\\"故乡\\\"的遥远感。\",\"english_approximation\":\"hometown, native city —— 完全丢失了\\\"亲爱的\\\"这层亲密感。\",\"emotion_tags\":[\"故乡\",\"亲切\",\"俄罗斯\",\"归属\",\"爱\"],\"usage_scenario\":\"坐火车回到自己长大的城市时。\",\"user_search_description\":\"不只是一个地方——是我亲爱的城市，一说出来心里就暖一下的那种\",\"cultural_note\":\"родной 这个词根在俄语中构成了大量情感词：родина（祖国）、родные（亲人）。\"},{\"word\":\"Zimnyaya Vishnya（Зимняя вишня）\",\"language\":\"俄语\",\"pronunciation\":\"/ˈzʲimnʲɪjə ˈvʲiʂnʲə/\",\"literal_meaning\":\"冬天的樱桃\",\"chinese_explanation\":\"指独立带娃、又优雅美丽的女性——冬天里一颗红色的樱桃。这个词带有尊敬、怜惜和赞叹。\",\"english_approximation\":\"elegant single mother —— 英语的表述太过直白。\",\"emotion_tags\":[\"敬佩\",\"优雅\",\"坚韧\",\"母爱\",\"俄罗斯\"],\"usage_scenario\":\"描述一位独自抚养孩子但依然活得光彩照人的女性。\",\"user_search_description\":\"一个人带孩子，但活得特别好看——像冬天里的一颗红樱桃\",\"cultural_note\":\"同名苏联电影《冬天的樱桃》让这个词在俄语中广泛流传。\"},{\"word\":\"Herria\",\"language\":\"巴斯克语\",\"pronunciation\":\"/eˈri.a/\",\"literal_meaning\":\"同时指国家、地区和人民\",\"chinese_explanation\":\"这个巴斯克词同时包含\\\"（政法意义上的）国家\\\"、\\\"（文化和地理意义上的）地区\\\"和\\\"人民\\\"三层含义——人民与家园不可区分。在巴斯克人反抗佛朗哥法西斯政权的历史语境中，Herria 的\\\"三位一体\\\"格外意味深长。\",\"english_approximation\":\"country, region, people —— 英语需要三个词。\",\"emotion_tags\":[\"家园\",\"人民\",\"认同\",\"抵抗\",\"巴斯克\"],\"usage_scenario\":\"表达对巴斯克土地的认同感。\",\"user_search_description\":\"我的国家、我的土地、我的人民——这三个概念在一个词里，分不开\",\"cultural_note\":\"智利反独裁民歌《团结的人民永不被击溃》的巴斯克语版就是 \\\"Herria Batua Inoiz Ez Garaitua\\\"。\"},{\"word\":\"Pashtunwali\",\"language\":\"普什图语\",\"pronunciation\":\"/pəʃtʊnˈwali/\",\"literal_meaning\":\"普什图之道\",\"chinese_explanation\":\"普什图民族不成文的伦理规范和行为准则——包括好客（melmastia）、庇护（nanawatai）、荣誉（nang）、正义、勇敢和复仇等多种价值观的综合体。不是一个词可以概括的，而是一整套人格理想。\",\"english_approximation\":\"Pashtun code of honor —— 过于简略。\",\"emotion_tags\":[\"荣誉\",\"准则\",\"传统\",\"认同\",\"普什图\"],\"usage_scenario\":\"讨论阿富汗/巴基斯坦地区的普什图社会文化。\",\"user_search_description\":\"不是法律，也不是宗教，而是几百年传下来的做人的一整套规矩——什么该做什么打死不能做\",\"cultural_note\":\"在许多普什图人心中，pashtunwali 的约束力大于国家和宗教法律。\"},{\"word\":\"Redamancy\",\"language\":\"英语\",\"pronunciation\":\"/rɪˈdæmənsi/\",\"literal_meaning\":\"被爱回来\",\"chinese_explanation\":\"当你爱着某个人、而对方也正爱着你——相互的爱。不同于 \\\"mutual love\\\" 的直接宣告，redamancy 带有一种\\\"爱的回声\\\"的诗意——你发出的爱被完完整整地送回来了。\",\"english_approximation\":\"mutual love, reciprocated love —— 但 redamancy 强调的是\\\"被回应\\\"这个动作的美。\",\"emotion_tags\":[\"爱\",\"回应\",\"双向\",\"幸福\",\"诗意\"],\"usage_scenario\":\"发现你暗恋的人也正好喜欢你的那一刻。\",\"user_search_description\":\"不是我爱你也爱你——是我爱着你，然后发现你也正爱着我，像回声一样\",\"cultural_note\":\"这个词在英语中极为罕见，几乎只出现在优美的写作中。\"},{\"word\":\"Serendipity\",\"language\":\"英语\",\"pronunciation\":\"/ˌsɛrənˈdɪpɪti/\",\"literal_meaning\":\"意外发现美好事物的能力\",\"chinese_explanation\":\"不经意的、偶然的、但美好的发现——在找一样东西时意外发现了另一样更美好的东西。不只是一种经历，更是一种\\\"善于在意外中发现美好\\\"的能力和运气。\",\"english_approximation\":\"fortunate coincidence, happy accident —— 但 serendipity 把这种\\\"巧遇美好\\\"的能力命名了。\",\"emotion_tags\":[\"惊喜\",\"巧合\",\"美好\",\"运气\",\"发现\"],\"usage_scenario\":\"迷路时发现了一家超棒的小咖啡馆、翻阅一本旧书时发现了夹在里面的情书。\",\"user_search_description\":\"不是刻意去找，但就是刚好碰上了一件特别美的事——像生活偷偷给你塞了个礼物\",\"cultural_note\":\"词源来自波斯童话《锡兰三王子》，故事中的王子总是\\\"意外发现他们并没有在找的东西\\\"。\"},{\"word\":\"Crush\",\"language\":\"英语\",\"pronunciation\":\"/krʌʃ/\",\"literal_meaning\":\"碾压、压碎\",\"chinese_explanation\":\"青春期那种短暂、热烈但又羞涩的暗恋——\\\"心动对象\\\"。不是 love，不是 infatuation，而是那个你每天在学校走廊里偷看的人。热烈但通常没有结果，但不妨碍它真实。\",\"english_approximation\":\"infatuation, puppy love —— 但 crush 更少女/少年，更纯，更不具负担。\",\"emotion_tags\":[\"暗恋\",\"青春\",\"心跳\",\"羞涩\",\"短暂\"],\"usage_scenario\":\"中学时代的暗恋、公交车上遇到的陌生人让你心跳加速。\",\"user_search_description\":\"不是谈恋爱也不是暗恋到刻骨——就是每天想多看 ta 一眼、心里小鹿乱撞的那个阶段\",\"cultural_note\":\"为什么用 crush（压碎）来形容心动？——因为心动时心像是被捏了一把。\"},{\"word\":\"Löikas\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/løi.kas/\",\"literal_meaning\":\"全方位的实感体验\",\"chinese_explanation\":\"一种全身心的沉浸式体验——可以是小时候冬天阳光照耀朴素大地的怀旧感，也可以是春晨锈迹斑驳的铁栅栏上露珠散发的青草芬芳。是进入工业废土的后现代场景、战火硝烟的二战氛围，或在大都市摩登社交之后怀念老家撸串打游戏的那种\\\"接地气\\\"感觉。Löikas 是激发思绪和灵感的重要利器，也造就了各地不同的文化气质。\",\"english_approximation\":\"immersive sensory experience, vibe, atmosphere —— 每个词都只覆盖了 Löikas 的一小面。\",\"emotion_tags\":[\"沉浸\",\"怀旧\",\"氛围\",\"文化气质\",\"灵感\"],\"usage_scenario\":\"描述一个让你完全沉浸其中的环境氛围和感觉。\",\"user_search_description\":\"不是用眼睛看或用耳朵听，而是整个人被那种氛围包裹住——闻得到、触得到、陷进去了\",\"cultural_note\":\"Löikas 强调的不是单一的感官，而是所有感官加记忆和情绪的综合体验。\"},{\"word\":\"Shyiyero\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/ʃji.je.ro/\",\"literal_meaning\":\"概念化思维\",\"chinese_explanation\":\"类似 MBTI 中的 N（直觉型）——不受客观条件束缚的抽象思维能力。在居容台体系中，概念化是\\\"做人的基本素质门槛\\\"——只有拥有概念化思维，才能主动驾驭生活，而非被动反应。\",\"english_approximation\":\"conceptual thinking, intuitive cognition\",\"emotion_tags\":[\"抽象\",\"直觉\",\"自由\",\"思维\"],\"usage_scenario\":\"跳出眼前的现实框架进行抽象思考时。\",\"user_search_description\":\"不是看山是山看水是水——是能脱离眼前的现实去想那个更大的框架和可能性\",\"cultural_note\":\"与\\\"实感化\\\"（S型）思维相对。\"},{\"word\":\"Frukos\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/fru.kos/\",\"literal_meaning\":\"流体自组织的规则流动\",\"chinese_explanation\":\"流体在封闭环境中无规则流动一段时间后（忽略能量流失）必然形成的有规则流动——大洋洋流都属于 Frukos 的范畴。引申义：剧本工程师用各种设定通过模因效应进行模拟实验时，最终自然浮现的最佳剧情方案也是 Frukos——混沌中自发形成的秩序。\",\"english_approximation\":\"emergent order, self-organizing pattern\",\"emotion_tags\":[\"秩序\",\"混沌\",\"自然\",\"涌现\"],\"usage_scenario\":\"描述复杂系统在混沌中自动形成的秩序。\",\"user_search_description\":\"一堆乱七八糟的东西动来动去，动到最后自己形成了一种规律——像洋流那样\",\"cultural_note\":\"Frukos 描述了从无序中自然涌现的有序——是\\\"道法自然\\\"的流体力学版。\"},{\"word\":\"Chykundö\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/tʃy.kun.dø/\",\"literal_meaning\":\"精神和肉体的完备协调\",\"chinese_explanation\":\"一种没有任何迷茫的、精神和肉体完全统一的状态——你清楚地知道自己在做什么、能做什么，掌控一切。比如动作电影中主角在电梯狭小空间内用墙壁支撑控制住反派、用镜子全方位观察对手的那种状态——身体和精神达到了最高效的协调。\",\"english_approximation\":\"complete mind-body coordination, full situational awareness\",\"emotion_tags\":[\"掌控\",\"协调\",\"自信\",\"完备\"],\"usage_scenario\":\"运动员进入巅峰状态、危急时刻的完美掌控。\",\"user_search_description\":\"脑子清楚、身体听话、完全没有迷茫——整个人像一台精密的仪器一样运转\",\"cultural_note\":\"词根 Kun 表示\\\"用肉体去面对\\\"，Dö 表示\\\"站在个人角度的主观\\\"。\"},{\"word\":\"Maros\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/ma.ros/\",\"literal_meaning\":\"液态的、能与任何事物兼容的状态\",\"chinese_explanation\":\"本义是一种可兼容万物的粘稠流体状态。引申为\\\"能与人的思维情绪意志互相兼容的信息格式\\\"——不是生硬的命令，而是一种与人的思维节奏和情绪波段更契合的\\\"模因能量\\\"。当理性思维开始束缚情绪时，可以说 \\\"Marosdö!\\\" 来抵抗。\",\"english_approximation\":\"compatible information flow, meme energy\",\"emotion_tags\":[\"兼容\",\"流动\",\"和谐\",\"信息\",\"情绪\"],\"usage_scenario\":\"当你感受到情绪和思维的和谐兼容，为此产生愉悦时，可以说 \\\"Sumarosdö!\\\"。\",\"user_search_description\":\"不是被人命令，而是一种很自然地、像水流一样刚好吻合你心情的信息——听了就舒服\",\"cultural_note\":\"Maros 与人的思维的关系，如同二进制与计算机的关系——是\\\"信息的基础格式\\\"。\"},{\"word\":\"AluhSda\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/a.luχ.sda/\",\"literal_meaning\":\"抱着一团火苗，站在原地向众人汇报\",\"chinese_explanation\":\"用自身的热情感染众人——像举着一团火焰站在人群中间，让每个人都被点燃。\",\"english_approximation\":\"to inspire with passion, to spread one's fire\",\"emotion_tags\":[\"热情\",\"感染\",\"领导力\",\"火焰\"],\"usage_scenario\":\"演讲者用自己的激情带动全场。\",\"user_search_description\":\"你心里有一团火，然后你站在大家中间，让每个人心里也烧起来\",\"cultural_note\":\"词根 Aluh 表示\\\"抱着一团火苗\\\"，Sda 表示\\\"站在原地向众人汇报\\\"。\"},{\"word\":\"Txunlasula / Trunlasula\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/tʃun.la.su.la/ /trun.la.su.la/\",\"literal_meaning\":\"为普世大同而开心 / 为完成使命而开心\",\"chinese_explanation\":\"Txunlasula 是一种为全人类的普世大同感到由衷快乐的高级情感。Trunlasula 则是确信自己能够完成（或必定能完成）某项重大使命时感到的由衷喜悦。\",\"english_approximation\":\"joy for universal harmony / joy for mission accomplished\",\"emotion_tags\":[\"大同\",\"使命\",\"喜悦\",\"崇高\"],\"usage_scenario\":\"看到人类和解的消息时、完成一项人生使命时。\",\"user_search_description\":\"不是为了自己开心，而是为这个世界终于越来越好而发自内心地高兴\",\"cultural_note\":\"txun = 普世/公平，la = 快乐，su = 感受；trun = 通过/完成。\"},{\"word\":\"Sunyire\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/su.ɲi.re/\",\"literal_meaning\":\"对周遭环境地毯式的关心并寻求兼容\",\"chinese_explanation\":\"极其在乎环境氛围——比如装修时要确保每一件家具都能与自己产生精神互动。极端的 Sunyire 携带者会要求环境的每一个细节都与自己共鸣。A 型血人的性格特质就带有 Sunyire 的意味——在乎环境和他人的想法，同时带动完美主义和偏执。\",\"english_approximation\":\"obsessive environmental harmony-seeking\",\"emotion_tags\":[\"完美主义\",\"环境\",\"兼容\",\"敏感\",\"A 型人格\"],\"usage_scenario\":\"精心布置家居、对社交场合的气氛异常敏感。\",\"user_search_description\":\"不是控制欲，是希望自己待的地方每一寸都跟我有精神上的互动——不舒服就待不住\",\"cultural_note\":\"在居容台体系中，Sunyire 被视为一种模因特质。\"},{\"word\":\"Zvumba\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/zvum.ba/\",\"literal_meaning\":\"模因经济的基础设施\",\"chinese_explanation\":\"任何能够保存、聚集、激活和创造模因的东西。最原始的 Zvumba 有篝火（吸引追求喜庆群居的人类载歌载舞）、中古的有神龛、教堂和墓碑（吸引对同一意识形态有共同信仰的人）。正如工业经济需要高速公路，数字经济需要基站，模因经济需要 Zvumba。\",\"english_approximation\":\"meme infrastructure\",\"emotion_tags\":[\"模因\",\"传播\",\"聚集\",\"文明\"],\"usage_scenario\":\"讨论文化传播的载体和聚集地。\",\"user_search_description\":\"篝火、教堂、直播间——这些都是让人的精神和情感聚集在一起的地方\",\"cultural_note\":\"Zvumba 是一个宏大的文明概念——物质世界中所有\\\"承载精神聚集\\\"的载体都是 Zvumba。\"},{\"word\":\"Entö\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/en.tø/\",\"literal_meaning\":\"科学的最基础\",\"chinese_explanation\":\"数学并非科学的最基础——Entö 才是。它是一种承认了心理学的非绝对理性影响和未知潜能的纯粹逻辑学；是承认了人的局限、同时立志于突破一切、驾驭时空当中所有逻辑思想的基本思维体系。\",\"english_approximation\":\"foundational pure logic beyond mathematics\",\"emotion_tags\":[\"逻辑\",\"元科学\",\"突破\",\"局限意识\"],\"usage_scenario\":\"哲学和科学方法论讨论。\",\"user_search_description\":\"比数学更深、比逻辑更基础——是那种知道自己有限但还是要追求全部真相的态度\",\"cultural_note\":\"Entö 在居容台体系中是\\\"科学之前的科学\\\"。\"},{\"word\":\"Ahrn\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/aːrn/\",\"literal_meaning\":\"不管怎样，回归当下自我\",\"chinese_explanation\":\"在总结完前面所有事情之后，得出结论——那些都无所谓、不重要，以\\\"回归当下自我\\\"为中心继续前进。类似英语 anyway 或意大利语 allora，但语气更强烈，带有一种傲慢和自我中心感。当你带领团队时有人列举各种不利于团队的事情，你扇他一耳光然后说 \\\"Ahrn Jüron Kurondö\\\"——意思是：我不管你说的那些废话，坚持真理原则，激进高效向前走就对了。\",\"english_approximation\":\"anyway, moving on —— 但 Ahrn 带有更强的决断力和自我中心。\",\"emotion_tags\":[\"决断\",\"自我中心\",\"前进\",\"傲慢\"],\"usage_scenario\":\"打断无意义的抱怨和讨论，做出决断。\",\"user_search_description\":\"别跟我扯那些没用的——不重要，按我说的做，往前冲\",\"cultural_note\":\"Ahrn 在团队领导语境中是权力和方向的集中表达。\"},{\"word\":\"Puchük\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/pu.tʃyk/\",\"literal_meaning\":\"用通透的方式感知和看透一切\",\"chinese_explanation\":\"一种应该成为基本素质的能力——用理性直觉和活跃思维看穿谎言和诡计。当有人用诡计破坏秩序时，你可以说 \\\"Kara? Puchükdö!\\\"（\\\"怎么，你要干坏事么？我早就看穿了！\\\"）\",\"english_approximation\":\"to see through, to perceive transparently\",\"emotion_tags\":[\"看穿\",\"通透\",\"清醒\",\"独立思考\"],\"usage_scenario\":\"识破谎言和操纵。\",\"user_search_description\":\"你那点小九九我一眼就看到底了——别装了\",\"cultural_note\":\"在居容台体系中，缺乏 Puchük 被视为现实社会谎言横行的主要原因。\"},{\"word\":\"Tsxon\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/tsxon/\",\"literal_meaning\":\"人与时空的互动共舞\",\"chinese_explanation\":\"人在时空当中做任何行为——在人生的舞台上摸爬滚打的全部动作。tsx 有\\\"摩擦\\\"的意思，on 有\\\"结果和具象\\\"的意思。当你成年告别父母时，可以对父母说 \\\"Tsxon Farimka!\\\"——\\\"只有在人生的舞台上摸爬滚打，才能看到终极结果！\",\"english_approximation\":\"to engage with time and space, to dance with existence\",\"emotion_tags\":[\"行动\",\"人生\",\"摩擦\",\"舞台\",\"成长\"],\"usage_scenario\":\"表达\\\"我要去闯了\\\"的决意。\",\"user_search_description\":\"站在人生的舞台上，所有折腾、所有摸爬滚打都是 Tsxon——干就完了\",\"cultural_note\":\"以 Tsxon 命名音乐专辑会非常有\\\"中二爆表又有高级感\\\"的效果。\"},{\"word\":\"Kara\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"\",\"literal_meaning\":\"\",\"chinese_explanation\":\"遵循惯性逻辑的合理——类似英美法系判例法的合理性。强调以当下为观测角度做是非判断。\",\"english_approximation\":\"\",\"emotion_tags\":[\"逻辑\",\"人情\",\"优化\",\"合理\"],\"usage_scenario\":\"\",\"user_search_description\":\"不是所有'合理'都是一样的——有的合理是'以前就这么干的'，有的是'大家都舒服'，有的是'数学上最优'\",\"cultural_note\":\"原条目标题：三种\\\"合理\\\"——Kara / Lüne / Metrioi\"},{\"word\":\"Lüne\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"\",\"literal_meaning\":\"\",\"chinese_explanation\":\"人性化的合理——应用于谁也不得罪的人情世故场景。\",\"english_approximation\":\"\",\"emotion_tags\":[\"逻辑\",\"人情\",\"优化\",\"合理\"],\"usage_scenario\":\"\",\"user_search_description\":\"不是所有'合理'都是一样的——有的合理是'以前就这么干的'，有的是'大家都舒服'，有的是'数学上最优'\",\"cultural_note\":\"原条目标题：三种\\\"合理\\\"——Kara / Lüne / Metrioi\"},{\"word\":\"Metrioi\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"\",\"literal_meaning\":\"\",\"chinese_explanation\":\"逻辑规划最佳方案的合理性——比如做好最节约时间又能完成最多任务的旅行规划。\",\"english_approximation\":\"\",\"emotion_tags\":[\"逻辑\",\"人情\",\"优化\",\"合理\"],\"usage_scenario\":\"\",\"user_search_description\":\"不是所有'合理'都是一样的——有的合理是'以前就这么干的'，有的是'大家都舒服'，有的是'数学上最优'\",\"cultural_note\":\"原条目标题：三种\\\"合理\\\"——Kara / Lüne / Metrioi\"},{\"word\":\"Shyhsman\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/ʃyhs.man/\",\"literal_meaning\":\"摆脱自我教条、通往自由意志的最高级情感\",\"chinese_explanation\":\"做最酷的人，最高效地利用思维和情绪价值，忠于清醒的思绪从而获得自由意志。与之相反的是\\\"缺乏人格的工具人\\\"。与良好的睡眠、人格魅力、语言天赋和主观幸福感呈高度正相关。\",\"english_approximation\":\"liberated selfhood, authentic free will\",\"emotion_tags\":[\"自由意志\",\"清醒\",\"酷\",\"人格\",\"幸福\"],\"usage_scenario\":\"从社会教条中挣脱、活出真我的状态。\",\"user_search_description\":\"不是别人期待你成为的那种人——是终于挣脱了所有框框架架、做最真的自己\",\"cultural_note\":\"Shyhsman 在居容台体系中被视为心理健康的最高指标之一。\"},{\"word\":\"KunIzum\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/kun.i.zum/\",\"literal_meaning\":\"以身体为原则中心\",\"chinese_explanation\":\"与其遵循真理或规则，不如遵循自己看得见摸得到的身体实际——累了就休息，开心了就唱歌跳舞，和人发生矛盾用身体肉搏。如果人只做真理和规则的奴隶，人会崩溃。码头工人和挑山工式的承重工作也属于 KunIzum 的范畴。\",\"english_approximation\":\"body-centered pragmatism\",\"emotion_tags\":[\"身体\",\"本能\",\"务实\",\"解脱\"],\"usage_scenario\":\"从过度理性中解脱出来，回归身体本能。\",\"user_search_description\":\"别想那么多——累了就歇，饿了就吃，生气了就打一架。身体说了算。\",\"cultural_note\":\"Kun（用身体见证）+ Izum（主义），与过度理性化的人文主义形成对照。\"},{\"word\":\"Vrnda\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/vrn.da/\",\"literal_meaning\":\"矛盾但都合理的互反关系\",\"chinese_explanation\":\"举例：智齿顶到肉导致肿胀，肿胀让智齿更压迫神经更痛苦——但如果肉没有莫名其妙肿胀，一切都不会发生。这两种现象互为 Vrnda 关系。薛定谔的那只既死又活的猫、拉普拉斯恶魔与不确定性原理——都互为 Vrnda。\",\"english_approximation\":\"contradictory-yet-both-valid relationship\",\"emotion_tags\":[\"矛盾\",\"合理\",\"悖论\",\"环环相扣\"],\"usage_scenario\":\"描述自指涉的、互相催化的矛盾关系。\",\"user_search_description\":\"两件事各自都说得通，但放在一起就互相对立——而且谁都离不开谁\",\"cultural_note\":\"Vrnda 是一种超越了\\\"对与错\\\"的思维方式。\"},{\"word\":\"Gagajükundö\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/ga.ga.jy.kun.dø/\",\"literal_meaning\":\"表达自我意识的单词\",\"chinese_explanation\":\"一个专门用来表达和唤醒自我意识的词——当你说出它的时候，你在确认自己的存在和主体性。\",\"english_approximation\":\"\",\"emotion_tags\":[\"自我\",\"意识\",\"存在\"],\"usage_scenario\":\"\",\"user_search_description\":\"我是我——不是别人——这个念头被浓缩在一个词里\",\"cultural_note\":\"\"},{\"word\":\"Sxwubi\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/sxwu.bi/\",\"literal_meaning\":\"完整的人生心理历程\",\"chinese_explanation\":\"不同于表演型人格面对每个社交情境做出不同表现——Sxwubi 强调的是清晰理智地控制好人生时间线与经历经验表现之间的关系。驾驭这种模因需要极度自我且理智。\",\"english_approximation\":\"coherent life narrative control\",\"emotion_tags\":[\"自控\",\"一致\",\"理智\",\"人生\"],\"usage_scenario\":\"不被环境牵着走，保持一个统一的人生叙事。\",\"user_search_description\":\"不是在不同场合换不同的脸——是所有经历串起来的一条完整的人生线\",\"cultural_note\":\"\"},{\"word\":\"Erdünk\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/er.dynk/\",\"literal_meaning\":\"硬核面对一切\",\"chinese_explanation\":\"不管冰雹还是强光——不躲不闪，正面迎上。\",\"english_approximation\":\"to face everything head-on\",\"emotion_tags\":[\"硬核\",\"刚毅\",\"面对\"],\"usage_scenario\":\"逆境中不屈不挠。\",\"user_search_description\":\"不管来的是什么——冰雹也好强光也好——我就站这儿，不躲\",\"cultural_note\":\"\"},{\"word\":\"Hugra\",\"language\":\"弗洛达语（人造语言）\",\"pronunciation\":\"/hu.gra/\",\"literal_meaning\":\"自我反馈、自我暗示\",\"chinese_explanation\":\"一种向内的循环——自己给自己反馈，自己暗示自己。是一种精神上的自我调节机制。\",\"english_approximation\":\"self-feedback, auto-suggestion\",\"emotion_tags\":[\"内省\",\"自我\",\"调节\"],\"usage_scenario\":\"给自己打气、复盘自己的行为。\",\"user_search_description\":\"不是别人夸你或骂你——是你自己在跟自己说话，告诉自己什么是对的\",\"cultural_note\":\"\"},{\"word\":\"Bilita Mpash\",\"language\":\"班图语\",\"pronunciation\":\"/biˈli.ta mpaʃ/\",\"literal_meaning\":\"绝妙的美梦\",\"chinese_explanation\":\"一个极其美好的梦——不只是\\\"好梦\\\"，而是噩梦的反面。那种让你醒来后仍然嘴角带笑的梦。\",\"english_approximation\":\"amazing dream, the opposite of a nightmare —— 英语只能说 \\\"good dream\\\"。\",\"emotion_tags\":[\"梦\",\"美好\",\"幸福\",\"非洲\"],\"usage_scenario\":\"早上醒来回忆昨晚那个让你整个人都暖起来的梦。\",\"user_search_description\":\"不只是好梦——是那种醒了之后还舍不得起来的绝美梦境\",\"cultural_note\":\"\"},{\"word\":\"Fremdschämen\",\"language\":\"德语\",\"pronunciation\":\"/ˈfʁɛmtˌʃɛːmən/\",\"literal_meaning\":\"替别人羞耻\",\"chinese_explanation\":\"看到别人做蠢事或出丑时自己也感到羞耻——Schadenfreude（幸灾乐祸）的温柔表亲，vicarious embarrassment 的德语版。比芬兰语的 myötähäpeä 更温和。\",\"english_approximation\":\"vicarious embarrassment, secondhand shame\",\"emotion_tags\":[\"尴尬\",\"共情\",\"羞耻\",\"温和\"],\"usage_scenario\":\"看尴尬的才艺表演、同事在台上出丑。\",\"user_search_description\":\"看到别人尴尬我自己先脸红了——不是笑话他，是真的替他不好意思\",\"cultural_note\":\"\"},{\"word\":\"Frühjahrsmüdigkeit\",\"language\":\"德语\",\"pronunciation\":\"/ˈfʁyːjaːɐsˌmyːdɪçkaɪt/\",\"literal_meaning\":\"春疲\",\"chinese_explanation\":\"春天来临时反而感到疲倦、抑郁、无精打采——一种\\\"反向季节性情绪失调\\\"。冬天熬过去了，春天来了，但你却蔫了。\",\"english_approximation\":\"spring fatigue, reverse SAD\",\"emotion_tags\":[\"疲倦\",\"春季\",\"抑郁\",\"反向\"],\"usage_scenario\":\"三四月份明明天气变好了却莫名疲惫。\",\"user_search_description\":\"春天终于来了，但整个人反而蔫了——不想动、没精神\",\"cultural_note\":\"Frühjahr（春天）+ Müdigkeit（疲倦）。\"},{\"word\":\"Greng-jai\",\"language\":\"泰语\",\"pronunciation\":\"/kreŋ tɕaj/\",\"literal_meaning\":\"怕麻烦别人\",\"chinese_explanation\":\"那种\\\"我不想要别人为我做某事，因为那会让对方太麻烦\\\"的感觉——一种极致的体贴和不愿欠人情的心理。是泰国社交文化中极其重要的概念。\",\"english_approximation\":\"not wanting to impose or burden others\",\"emotion_tags\":[\"体贴\",\"客气\",\"愧疚\",\"泰国文化\"],\"usage_scenario\":\"婉拒朋友的帮忙、不好意思开口求助。\",\"user_search_description\":\"不是不想被帮——是怕麻烦别人，怕欠人情，所以算了我自己来\",\"cultural_note\":\"\"},{\"word\":\"Honigkuchenpferd\",\"language\":\"德语\",\"pronunciation\":\"/ˈhoːnɪçˌkuːxənˌpfeːɐt/\",\"literal_meaning\":\"蜂蜜蛋糕马\",\"chinese_explanation\":\"脸上挂着巨大的、怎么都抹不掉的笑容——像一匹蜂蜜蛋糕做的马那样咧嘴笑。相当于英语的 \\\"grinning like a Cheshire cat\\\"。\",\"english_approximation\":\"grinning broadly, beaming\",\"emotion_tags\":[\"大笑\",\"笑容\",\"甜\",\"德语\"],\"usage_scenario\":\"形容一个人笑得合不拢嘴。\",\"user_search_description\":\"笑得像个蜂蜜蛋糕做的马——嘴巴咧到耳朵根、停都停不下来\",\"cultural_note\":\"\"},{\"word\":\"Kaelling\",\"language\":\"丹麦语\",\"pronunciation\":\"/ˈkɛːleŋ/\",\"literal_meaning\":\"当街吼孩子的女人\",\"chinese_explanation\":\"你知道那种站在门口（或在超市排队、在公园、在餐厅）大声责骂自己孩子的女人吗？丹麦人有专门的词来称呼她。\",\"english_approximation\":\"a woman who yells at her children in public\",\"emotion_tags\":[\"育儿\",\"暴躁\",\"公共场合\",\"丹麦\"],\"usage_scenario\":\"在公共场合看到那种大声吼娃的妈妈。\",\"user_search_description\":\"那种不管在哪都大声吼自家小孩的女人——超市、公园、哪都行\",\"cultural_note\":\"丹麦社会对这种行为有专门的社会标签。\"},{\"word\":\"Layogenic\",\"language\":\"他加禄语（菲律宾）\",\"pronunciation\":\"/laɪoʊˈdʒɛnɪk/\",\"literal_meaning\":\"远看近看不一样\",\"chinese_explanation\":\"像《独领风骚》里 Cher 说的 \\\"a full-on Monet\\\"——从远处看还行，走近一看是一团糟。特指那种远看好看、近看毁所有的情况。\",\"english_approximation\":\"good from afar but far from good\",\"emotion_tags\":[\"失望\",\"外貌\",\"远视\",\"菲律宾\"],\"usage_scenario\":\"远远看到一个人觉得特别好看走近发现……\",\"user_search_description\":\"远远看着挺好的，走进一看——啊这……怎么跟想的完全不一样\",\"cultural_note\":\"\"},{\"word\":\"Packesel\",\"language\":\"德语\",\"pronunciation\":\"/ˈpakˌʔeːzəl/\",\"literal_meaning\":\"驮驴\",\"chinese_explanation\":\"那个在旅途中被所有人当成搬运工的人——谁的东西都往 ta 身上挂。字面上就是\\\"驮东西的驴\\\"。\",\"english_approximation\":\"pack mule, the person stuck carrying everyone's bags\",\"emotion_tags\":[\"负担\",\"无奈\",\"旅行\",\"幽默\"],\"usage_scenario\":\"全家出游时那个背着所有包的人。\",\"user_search_description\":\"出去玩的时候所有人都把包往你身上堆——你就是那匹驮东西的驴\",\"cultural_note\":\"\"},{\"word\":\"Pelinti\",\"language\":\"布利语（加纳）\",\"pronunciation\":\"/peˈlin.ti/\",\"literal_meaning\":\"把滚烫的食物在嘴里来回移动\",\"chinese_explanation\":\"咬了一口滚烫的披萨或汤圆之后张开嘴发出的\\\"啊啊啊\\\"声，同时把食物在嘴里倒来倒去以免烫伤——加纳人专门给这个动作起了名字。\",\"english_approximation\":\"to move hot food around in your mouth\",\"emotion_tags\":[\"烫\",\"食物\",\"本能\",\"幽默\"],\"usage_scenario\":\"吃了一口刚出锅的东西被烫得张着嘴换气。\",\"user_search_description\":\"咬了一口太烫的东西，张着嘴'啊啊啊'地把食物在嘴里倒来倒去\",\"cultural_note\":\"\"},{\"word\":\"Razbliuto\",\"language\":\"俄语\",\"pronunciation\":\"/rʌzˈbluːtoʊ/\",\"literal_meaning\":\"对曾经爱过的人残留的情感\",\"chinese_explanation\":\"对已经不再爱的前任那种淡淡的、苦乐参半的怀念——不是仍然爱 ta，而是怀念那种\\\"爱过\\\"的感觉本身。与 razliubit（不再爱了）紧密相关但不同。\",\"english_approximation\":\"nostalgic feeling for someone you once loved\",\"emotion_tags\":[\"怀旧\",\"爱过\",\"释然\",\"俄语\"],\"usage_scenario\":\"偶然翻到前任的照片时心里那一下说不清的触动。\",\"user_search_description\":\"不是还爱——是每次想到'我曾经爱过这个人'的时候，心里有一点点说不清的感觉\",\"cultural_note\":\"英语中常被拼作 razbliuto，实际上是 razliubit 的名词化变体。\"},{\"word\":\"Schlemiel\",\"language\":\"意第绪语\",\"pronunciation\":\"/ʃləˈmiːl/\",\"literal_meaning\":\"笨手笨脚的人\",\"chinese_explanation\":\"意第绪语区分了两种\\\"倒霉\\\"：Schlemiel 是把咖啡洒了的那个人（笨手笨脚），Shlimazel 是被洒了一身的那个人（天生倒霉）。两个人经常一起出现。\",\"english_approximation\":\"clumsy person, the one who spills\",\"emotion_tags\":[\"笨拙\",\"倒霉\",\"幽默\",\"意第绪\"],\"usage_scenario\":\"形容那个总是打翻东西、出各种糗的人。\",\"user_search_description\":\"不是运气差——就是手脚不协调，走到哪摔到哪、碰到哪洒到哪\",\"cultural_note\":\"我们在词库中已有 Shlimazel（被洒一身的人），Schlemiel 是那个洒的人。\"},{\"word\":\"Seigneur-terraces\",\"language\":\"法语\",\"pronunciation\":\"/sɛɲœʁ tɛʁas/\",\"literal_meaning\":\"露台领主\",\"chinese_explanation\":\"那些在咖啡馆或餐厅点一杯最便宜的东西、然后占着最好的桌子坐一整个下午的人——不是流浪汉，而是\\\"咖啡馆钉子户\\\"。\",\"english_approximation\":\"coffee shop squatter, terrace lingerer\",\"emotion_tags\":[\"占座\",\"咖啡馆\",\"幽默\",\"法国\"],\"usage_scenario\":\"去咖啡馆发现每个好位子都被只点了一杯水的人占了。\",\"user_search_description\":\"点一杯最便宜的咖啡然后占着最好的位子坐一下午——像那个位子的领主\",\"cultural_note\":\"\"},{\"word\":\"Sentak Bangun\",\"language\":\"印尼语\",\"pronunciation\":\"/sənˈtak ˈbaŋun/\",\"literal_meaning\":\"惊醒\",\"chinese_explanation\":\"突然从睡梦中惊醒——可能是噩梦，可能是噪音，也可能只是身体自己决定\\\"够了，醒吧\\\"。\",\"english_approximation\":\"to wake up with a start\",\"emotion_tags\":[\"惊醒\",\"睡眠\",\"突然\"],\"usage_scenario\":\"半夜突然弹坐起来。\",\"user_search_description\":\"睡着睡着突然弹起来醒了——心脏砰砰跳\",\"cultural_note\":\"\"},{\"word\":\"Slampadato\",\"language\":\"意大利语\",\"pronunciation\":\"/slam.paˈda.to/\",\"literal_meaning\":\"迷恋日光浴沙龙的人\",\"chinese_explanation\":\"一个成瘾般地频繁光顾美黑沙龙的人——皮肤被 UV 灯烤得发亮。意大利人对这种现代美容癖好的精准命名。\",\"english_approximation\":\"tanning salon addict\",\"emotion_tags\":[\"美容\",\"成瘾\",\"外型\",\"意大利\"],\"usage_scenario\":\"形容那个一年四季皮肤都是古铜色的朋友。\",\"user_search_description\":\"那种不管冬天夏天都要去晒灯、皮肤永远是棕色的美黑上瘾者\",\"cultural_note\":\"\"},{\"word\":\"Vybafnout\",\"language\":\"捷克语\",\"pronunciation\":\"/ˈvɪbafnout/\",\"literal_meaning\":\"跳出来吓人\",\"chinese_explanation\":\"专门为\\\"突然从角落里跳出来大喊一声'哇！'吓人一跳\\\"这个动作而生的动词——哥哥吓妹妹的经典招数。\",\"english_approximation\":\"to jump out and say boo\",\"emotion_tags\":[\"惊吓\",\"恶作剧\",\"搞笑\",\"童年\"],\"usage_scenario\":\"恶作剧吓人的那个动作本身。\",\"user_search_description\":\"躲在门后面突然跳出来大叫一声——就为了看你吓一跳的样子\",\"cultural_note\":\"\"},{\"word\":\"Zeg\",\"language\":\"格鲁吉亚语\",\"pronunciation\":\"/zɛɡ/\",\"literal_meaning\":\"后天\",\"chinese_explanation\":\"后天\\\"——英语 technically 有 overmorrow，但几乎没人用。格鲁吉亚语则日常使用 zeg。\",\"english_approximation\":\"the day after tomorrow (overmorrow)\",\"emotion_tags\":[\"时间\",\"后天\",\"简洁\"],\"usage_scenario\":\"约定\\\"zeg 见面\\\"。\",\"user_search_description\":\"后天——英语要三个词，格鲁吉亚语一个词就够\",\"cultural_note\":\"\"},{\"word\":\"Sonder\",\"language\":\"英语（John Koenig 造词）\",\"pronunciation\":\"/ˈsɒndər/\",\"literal_meaning\":\"意识到每个路人都有和你一样复杂的人生\",\"chinese_explanation\":\"在人群中突然意识到——每一个擦肩而过的人都有着和你一样鲜活、复杂、充满悲喜的人生。你不是故事的主角，每个人都是自己故事的主角。\",\"english_approximation\":\"the realization that everyone has a vivid inner life\",\"emotion_tags\":[\"共情\",\"渺小\",\"连接\",\"哲学\"],\"usage_scenario\":\"在车站、飞机上看着人群时那种突然的触动。\",\"user_search_description\":\"在人群中突然意识到——每个路过的人都有自己的故事、自己的悲喜，和你一样完整\",\"cultural_note\":\"\"},{\"word\":\"Vemödalen\",\"language\":\"英语（John Koenig 造词）\",\"pronunciation\":\"/vɛˈmoʊdələn/\",\"literal_meaning\":\"害怕一切已经被做过了\",\"chinese_explanation\":\"拍到一张绝美的照片后突然意识到——同样的照片已经被成千上万的人拍过了。那种\\\"一切都已经发生过了\\\"的沮丧。\",\"english_approximation\":\"fear that everything has already been done\",\"emotion_tags\":[\"沮丧\",\"重复\",\"原创焦虑\",\"艺术\"],\"usage_scenario\":\"看到自己的创作和别人的雷同时那股无力感。\",\"user_search_description\":\"好不容易做出来一个东西，突然发现早就有人做过了——那种'我来晚了'的无力感\",\"cultural_note\":\"\"},{\"word\":\"Anecdoche\",\"language\":\"英语（John Koenig 造词）\",\"pronunciation\":\"/əˈnɛkdoʊki/\",\"literal_meaning\":\"没人聆听的对话\",\"chinese_explanation\":\"一场所有人都在说、但没有人真正在听的对话——每个人都在等自己开口的机会。\",\"english_approximation\":\"a conversation where everyone talks but nobody listens\",\"emotion_tags\":[\"孤独\",\"无效沟通\",\"社交\"],\"usage_scenario\":\"饭局上每个人都在讲自己的事、没有一个人在听。\",\"user_search_description\":\"一桌子人都在说话，但没有一个人真的在听别人说了什么\",\"cultural_note\":\"\"},{\"word\":\"Lachesism\",\"language\":\"英语（John Koenig 造词）\",\"pronunciation\":\"/ˈlækɪsɪzəm/\",\"literal_meaning\":\"渴望被灾难击中\",\"chinese_explanation\":\"一种想经历极端灾难的隐秘渴望——比如飞机失事但幸存、或者一场大火烧光一切然后从头开始。不是想死，而是想被彻底重置。\",\"english_approximation\":\"desire to be struck by disaster\",\"emotion_tags\":[\"重置\",\"极端\",\"渴望\",\"阴暗\"],\"usage_scenario\":\"偶尔冒出\\\"如果一切都毁了重新来过多好\\\"的念头。\",\"user_search_description\":\"有时候会想——如果一切都烧光了，我就可以从头再来。不是想死，是想重启。\",\"cultural_note\":\"\"},{\"word\":\"Moledro\",\"language\":\"英语（John Koenig 造词）\",\"pronunciation\":\"/moʊˈlɛdroʊ/\",\"literal_meaning\":\"与遥远艺术家的共鸣\",\"chinese_explanation\":\"与一个你永远见不到的、可能几百年前就已去世的作家或艺术家之间产生的深度共鸣——隔着时空，你觉得 ta 懂你。\",\"english_approximation\":\"resonant connection with a distant artist\",\"emotion_tags\":[\"共鸣\",\"时空\",\"艺术\",\"连接\"],\"usage_scenario\":\"读一首几百年前的诗感觉作者在跟你说话。\",\"user_search_description\":\"读一本几百年前的书，觉得作者好像就坐在对面、什么都懂我\",\"cultural_note\":\"\"},{\"word\":\"Rückkehrunruhe\",\"language\":\"德语\",\"pronunciation\":\"/ˈʁʏkkeːɐˌʔʊnʁuːə/\",\"literal_meaning\":\"归途不安\",\"chinese_explanation\":\"沉浸式旅行后回到家中，却发现旅行的记忆在迅速褪色——那种\\\"刚刚才发生的一切怎么已经在消失了\\\"的不安。\",\"english_approximation\":\"the feeling of returning home only to find the trip fading from awareness\",\"emotion_tags\":[\"旅行\",\"褪色\",\"归来\",\"不安\"],\"usage_scenario\":\"旅行回来第二天，已经感觉那段经历好遥远。\",\"user_search_description\":\"刚旅行回来，感觉那些美好的画面已经在脑子里模糊了——抓不住\",\"cultural_note\":\"\"},{\"word\":\"Kopfkino\",\"language\":\"德语\",\"pronunciation\":\"/ˈkɔpfˌkiːno/\",\"literal_meaning\":\"头脑电影院\",\"chinese_explanation\":\"在脑海中生动地放映各种场景——好的坏的、可能的不可能的，全在脑子里演了一遍。想象力的私人影院。\",\"english_approximation\":\"head cinema, vivid mental imagery\",\"emotion_tags\":[\"想象\",\"焦虑\",\"白日梦\",\"脑内剧场\"],\"usage_scenario\":\"睡前在脑子里导演各种剧情、焦虑时自动播放最坏的结局。\",\"user_search_description\":\"脑子里像有个电影院——没事就在里面上映各种剧情，有的是美梦，有的是噩梦\",\"cultural_note\":\"\"},{\"word\":\"Vorfreude\",\"language\":\"德语\",\"pronunciation\":\"/ˈfoːɐˌfʁɔʏdə/\",\"literal_meaning\":\"提前的快乐\",\"chinese_explanation\":\"对未来的美好事物产生的那种强烈的、愉悦的期待——和荷兰语 voorpret 相似但更正式、更广泛。\",\"english_approximation\":\"joyful anticipation, pre-joy\",\"emotion_tags\":[\"期待\",\"快乐\",\"未来\",\"倒数\"],\"usage_scenario\":\"倒数假期、期待见面的那段时间。\",\"user_search_description\":\"想到马上要发生的好事就很开心——光是想就已经开始享受了\",\"cultural_note\":\"\"},{\"word\":\"Fuchsteufelswütend\",\"language\":\"德语\",\"pronunciation\":\"/ˈfʊksˌtɔʏfəlsˌvyːtənt/\",\"literal_meaning\":\"狐狸-魔鬼-狂怒\",\"chinese_explanation\":\"暴怒到极点——像狐狸一样狡猾、像魔鬼一样邪恶、像烈火一样狂怒。三个词叠在一起制造出的极端愤怒。\",\"english_approximation\":\"steaming with rage, furiously angry\",\"emotion_tags\":[\"暴怒\",\"极端\",\"失控\"],\"usage_scenario\":\"被人彻底惹毛了、气到浑身发抖。\",\"user_search_description\":\"不是普通的生气——是气到狐狸见了都躲、魔鬼见了都怕的那种暴怒\",\"cultural_note\":\"\"},{\"word\":\"Shibui\",\"language\":\"日语\",\"pronunciation\":\"/ɕibɯi/\",\"literal_meaning\":\"涩味→沉稳的美\",\"chinese_explanation\":\"一种不张扬的、经过岁月沉淀的美——\\\"老派的酷\\\"。不是闪亮的新东西，而是被时间打磨过的、内敛的高级审美。\",\"english_approximation\":\"old school cool, understated elegance\",\"emotion_tags\":[\"审美\",\"内敛\",\"岁月\",\"日本\"],\"usage_scenario\":\"形容一件用了多年、越旧越好看的皮具，或一位不追赶潮流但品位极佳的老人。\",\"user_search_description\":\"不是新的、亮的那种好看——是旧旧的、沉沉稳稳的、越看越有味道的那种\",\"cultural_note\":\"\"},{\"word\":\"Ukiyo\",\"language\":\"日语\",\"pronunciation\":\"/ɯkijo/\",\"literal_meaning\":\"浮世\",\"chinese_explanation\":\"浮世\\\"——活在当下，超脱于生活的烦恼，沉浸在瞬间的欢愉中。江户时代的浮世绘就以此命名，描绘了一个及时行乐的世界。\",\"english_approximation\":\"the floating world, living in the moment\",\"emotion_tags\":[\"及时行乐\",\"浮世\",\"超脱\",\"日本美学\"],\"usage_scenario\":\"描述那种忘却烦恼、尽情享受眼前美好的状态。\",\"user_search_description\":\"不管明天怎样，现在这一刻就是一切——像浮在水面上一样轻盈自由\",\"cultural_note\":\"浮世绘（ukiyo-e）即来源于此。\"},{\"word\":\"Tokimeki\",\"language\":\"日语\",\"pronunciation\":\"/tokimeki/\",\"literal_meaning\":\"心跳加速\",\"chinese_explanation\":\"一种从某个具体的经历中获得的纯粹的、闪光的快乐和幸福感——不是持续的情绪，而是一个瞬间的\\\"心动\\\"。近藤麻理惠的整理法中就用到了这个词——只留下让你 tokimeki 的东西。\",\"english_approximation\":\"spark of joy, heart-fluttering excitement\",\"emotion_tags\":[\"心动\",\"闪光\",\"瞬间\",\"幸福\"],\"usage_scenario\":\"拿起一件旧物时心里闪过的那个\\\"喜欢\\\"。\",\"user_search_description\":\"拿起一个东西心里咯噔一下——不是大悲大喜，就是那一下子的'喜欢'\",\"cultural_note\":\"\"},{\"word\":\"Siftah\",\"language\":\"土耳其语\",\"pronunciation\":\"/sifˈtah/\",\"literal_meaning\":\"开张\",\"chinese_explanation\":\"商家一天中的第一笔交易——\\\"开张了！\\\"。在中国文化中也有类似的仪式感——第一笔生意做成后，这一天就顺了。\",\"english_approximation\":\"first sale of the day\",\"emotion_tags\":[\"生意\",\"开始\",\"顺利\",\"土耳其\"],\"usage_scenario\":\"小贩做成今天第一笔生意时的欣喜。\",\"user_search_description\":\"今天第一笔生意做成了——'开张了！'这一天就有盼头了\",\"cultural_note\":\"\"},{\"word\":\"Umarell\",\"language\":\"意大利语（博洛尼亚方言）\",\"pronunciation\":\"/umaˈrɛl/\",\"literal_meaning\":\"看工地的大爷\",\"chinese_explanation\":\"特指那种退休后整天站在建筑工地旁边、双手背在身后、看着工人干活、还时不时给点\\\"专业意见\\\"的老头——一种可爱的社会现象。\",\"english_approximation\":\"retired man who watches construction sites\",\"emotion_tags\":[\"退休\",\"观察\",\"可爱\",\"意大利\"],\"usage_scenario\":\"路过工地看到几个大爷站在围栏外盯着里面的挖掘机。\",\"user_search_description\":\"那种退休了没事干、天天站工地外面看人干活的大爷——手背在身后那种\",\"cultural_note\":\"\"},{\"word\":\"Cazzo\",\"language\":\"意大利语\",\"pronunciation\":\"/ˈkattso/\",\"literal_meaning\":\"粗俗感叹词\",\"chinese_explanation\":\"妙到适用于任何语境、任何情绪的万能脏话——愤怒时说 Cazzo、惊讶时说 Cazzo、开心时也可以说 Cazzo。能让听的人准确产生共情。中文里大概只有\\\"卧槽\\\"能与之媲美。\",\"english_approximation\":\"f**k, damn —— 但英语的 f-word 使用范围和情感带宽不如 Cazzo 广。\",\"emotion_tags\":[\"万能脏话\",\"感叹\",\"共情\",\"意大利\"],\"usage_scenario\":\"任何情绪的爆发点。\",\"user_search_description\":\"一个词走天下——高兴也说它、生气也说它、惊讶也说它。像中文的'卧槽'。\",\"cultural_note\":\"在意大利日常生活中使用频率极高，几乎可以出现在任何句子里。\"}]");
var sceneSignals = [
	["亲密关系", [
		"恋爱",
		"爱",
		"失恋",
		"情侣",
		"夫妻",
		"亲密",
		"浪漫",
		"心动",
		"依恋",
		"深爱",
		"暧昧"
	]],
	["友情家庭", [
		"朋友",
		"好友",
		"家",
		"家庭",
		"母亲",
		"子女",
		"社群",
		"归属",
		"陪伴",
		"友谊"
	]],
	["书影音余韵", [
		"故事",
		"小说",
		"电影",
		"音乐",
		"艺术",
		"表演",
		"阅读",
		"书",
		"沉浸",
		"想象"
	]],
	["工作学业", [
		"工作",
		"学习",
		"同事",
		"创业",
		"资源",
		"解决",
		"创造",
		"效率",
		"压力"
	]],
	["自我追问", [
		"存在",
		"生命",
		"命运",
		"宇宙",
		"自我",
		"羞愧",
		"痛苦",
		"渴望",
		"理想",
		"梦想"
	]],
	["日常瞬间", [
		"日常",
		"生活",
		"自然",
		"身体",
		"幽默",
		"时间",
		"旅行",
		"咖啡",
		"食物",
		"森林",
		"月光"
	]]
];
function inferSceneTags(word) {
	const text = [
		word.chinese_explanation,
		word.emotion_tags.join(","),
		word.usage_scenario,
		word.user_search_description,
		word.cultural_note
	].join("\n");
	const scenes = sceneSignals.filter(([, signals]) => signals.some((signal) => text.includes(signal))).map(([scene]) => scene);
	return scenes.length > 0 ? scenes.slice(0, 3) : ["日常瞬间"];
}
function buildKeywords(word) {
	const keywords = [
		word.literal_meaning,
		word.chinese_explanation,
		word.english_approximation,
		word.usage_scenario,
		word.user_search_description,
		...word.emotion_tags
	].flatMap((chunk) => chunk.split(/[,\s，、。；;：“”"（）()——-]+/)).map((keyword) => keyword.trim()).filter((keyword) => keyword.length >= 2 && keyword.length <= 18);
	return Array.from(new Set(keywords)).slice(0, 24);
}
function buildCultureNote(word) {
	return [
		word.literal_meaning ? `字面含义：${word.literal_meaning}` : "",
		word.english_approximation ? `英文近似：${word.english_approximation}` : "",
		word.cultural_note
	].filter(Boolean).join("。");
}
var wordSeeds = words_default.map((word) => ({
	word: word.word,
	language: word.language,
	pronunciation: word.pronunciation || "暂未提供",
	shortMeaning: word.chinese_explanation || word.literal_meaning || word.user_search_description,
	emotionTags: word.emotion_tags,
	sceneTags: inferSceneTags(word),
	cultureNote: buildCultureNote(word),
	sourceConfidence: "medium",
	keywords: buildKeywords(word)
}));
var fallbackSafetyNote = "这不是心理诊断，也不是治疗建议；它只是帮助你寻找更贴近此刻感受的表达。";
var fallbackWordsByScene = {
	亲密关系: {
		word: "saudade",
		language: "葡萄牙语",
		pronunciation: "sow-DAH-de",
		shortMeaning: "对缺席之人或失落关系的深长惦念",
		cultureNote: "常见解释是，它描述一种带着爱意和空缺感的想念。",
		whyItFits: (userText) => `本地词库里的候选词都不够贴近，所以第二轮改为直接找更成熟的外语表达。你提到“${pickInputClues(userText)[0]}”和“${pickInputClues(userText)[1]}”，线索都指向一种关系仍留在心里、但人已经不在眼前的牵挂，saudade 更适合承接这种感受。`,
		shareCopy: "原来这种明知碰不到、却还一直留在心里的想念，可以用 saudade 来说。"
	},
	日常瞬间: {
		word: "mono no aware",
		language: "日语",
		pronunciation: "もののあわれ",
		shortMeaning: "对事物易逝之美生出的轻微感伤",
		cultureNote: "常被用来描述日常细节里稍纵即逝的美与惆怅。",
		whyItFits: (userText) => `第一轮候选词匹配偏弱，所以第二轮不再硬贴词库。你写到“${pickInputClues(userText)[0]}”和“${pickInputClues(userText)[1]}”，更像是某个普通片刻突然变得很轻、又有点舍不得散去，mono no aware 更接近这种余味。`,
		shareCopy: "原来这种日常一闪而过、却让人心里轻轻一沉的感觉，可以用 mono no aware 来说。"
	},
	书影音余韵: {
		word: "sehnsucht",
		language: "德语",
		pronunciation: "ZAYN-zookt",
		shortMeaning: "对某种遥远而难以抵达之物的深切向往",
		cultureNote: "常见解释是，它指向一种被作品唤起的、说不清却很强的远望感。",
		whyItFits: (userText) => `第一轮没有拿到足够强的库内匹配，所以第二轮直接换成知识型推荐。你提到“${pickInputClues(userText)[0]}”和“${pickInputClues(userText)[1]}”，更像作品结束后留下的遥望感和未被说尽的渴念，sehnsucht 比硬凑本地词更准确。`,
		shareCopy: "原来作品结束后那种还在心里发酵的遥望感，可以用 sehnsucht 来说。"
	},
	友情家庭: {
		word: "toska",
		language: "俄语",
		pronunciation: "тоска",
		shortMeaning: "带着牵连感与空落感的沉郁心绪",
		cultureNote: "常被用来描述人与人之间难以完全说开的失落和牵挂。",
		whyItFits: (userText) => `第一轮给出的库内词关联度不够，所以这里不继续硬凑。你写到“${pickInputClues(userText)[0]}”和“${pickInputClues(userText)[1]}”，能看出这份感受跟关系牵连有关，也带一点说不透的空落，toska 更能装下这种复杂度。`,
		shareCopy: "原来这种和亲近的人牵连着、又有点空落落的感觉，可以用 toska 来说。"
	},
	工作学业: {
		word: "huzun",
		language: "土耳其语",
		pronunciation: "hü-ZÜN",
		shortMeaning: "被现实压力笼住的低沉与无力",
		cultureNote: "近似用法里，它常被拿来描述环境、期待与自我感受叠在一起的压抑。",
		whyItFits: (userText) => `本地词库第一轮匹配偏弱，继续从里面挑只会更勉强。你提到“${pickInputClues(userText)[0]}”和“${pickInputClues(userText)[1]}”，不是单点情绪，更像压力、责任和疲惫叠在一起的状态，huzun 更接近这种整体氛围。`,
		shareCopy: "原来这种被任务和期待一起压住的低沉感，可以用 huzun 来说。"
	},
	自我追问: {
		word: "duende",
		language: "西班牙语",
		pronunciation: "doo-EN-de",
		shortMeaning: "一种逼近内心深处、难以回避的生命张力",
		cultureNote: "常见解释里，它不是单纯情绪，而是一种把人往内里逼近的强烈感受。",
		whyItFits: (userText) => `第一轮词库匹配不够准，所以第二轮改为直接推荐更成熟的外语词。你写到“${pickInputClues(userText)[0]}”和“${pickInputClues(userText)[1]}”，更像是在追问自己此刻到底被什么牵住了，duende 比泛泛的情绪词更贴近这种内向张力。`,
		shareCopy: "原来这种逼着自己往内心深处看的张力感，可以用 duende 来说。"
	}
};
function normalizeText(value) {
	return value.trim().toLocaleLowerCase();
}
var semanticLexicon = {
	separation: [
		"分别",
		"分离",
		"离别",
		"离开",
		"告别",
		"想念",
		"思念",
		"缺席",
		"不在"
	],
	fleeting: [
		"短暂",
		"短促",
		"一瞬",
		"瞬间",
		"相遇",
		"遇见",
		"不可重复",
		"来不及"
	],
	overflow: [
		"满溢",
		"倾盆",
		"强烈",
		"汹涌",
		"交织",
		"快乐",
		"悲伤",
		"悲喜"
	],
	lightNature: [
		"阳光",
		"树叶",
		"光影",
		"斑驳",
		"自然",
		"树影"
	]
};
function extractMockSemanticFrame(text) {
	const normalized = normalizeText(text);
	const includesAny = (signals) => signals.filter((signal) => normalized.includes(signal.toLocaleLowerCase()));
	return {
		coreTerms: [...includesAny(semanticLexicon.separation), ...includesAny(semanticLexicon.fleeting)],
		emotionTerms: [...includesAny(semanticLexicon.overflow), ...includesAny(semanticLexicon.separation)],
		motifTerms: includesAny(semanticLexicon.lightNature)
	};
}
function scoreSeed(seed, userText, scene) {
	const normalized = normalizeText(userText);
	const keywordScore = seed.keywords.reduce((score, keyword) => {
		return normalized.includes(keyword.toLocaleLowerCase()) ? score + 6 : score;
	}, 0);
	const sceneScore = seed.sceneTags.includes(scene) ? 12 : 0;
	const lengthSignal = Math.min(Math.floor(normalized.length / 24), 5);
	return keywordScore + sceneScore + lengthSignal;
}
function semanticSeedScore(seed, frame) {
	const haystack = normalizeText([
		seed.shortMeaning,
		seed.cultureNote,
		...seed.keywords,
		...seed.emotionTags,
		...seed.sceneTags
	].join(" "));
	const scoreTerms = (terms, weight) => terms.reduce((score, term) => haystack.includes(term.toLocaleLowerCase()) ? score + weight : score, 0);
	const coreFit = scoreTerms(frame.coreTerms, 5);
	const emotionFit = scoreTerms(frame.emotionTerms, 3);
	const motifFit = scoreTerms(frame.motifTerms, 1);
	return {
		coreFit,
		emotionFit,
		motifFit,
		total: coreFit + emotionFit + motifFit
	};
}
function inferMatchConfidence(score) {
	if (score >= 24) return "high";
	if (score >= 14) return "medium";
	return "low";
}
function pickInputClues(userText) {
	const trimmed = userText.trim().replace(/\s+/g, " ");
	const pieces = trimmed.split(/[，。！？；,.!?;]/).map((piece) => piece.trim()).filter(Boolean);
	if (pieces.length >= 2) return pieces.slice(0, 2);
	if (trimmed.length <= 28) return [trimmed, "你希望给这段感受找到一个更准确的停靠点"];
	return [trimmed.slice(0, 28), trimmed.slice(Math.max(28, trimmed.length - 32))];
}
function shortenMeaning(value) {
	return value.replace(/[。.!！]+$/, "");
}
function sourceAwareCultureNote(seed) {
	if (seed.sourceConfidence === "high") return seed.cultureNote;
	return `${seed.cultureNote} 这里保留为近似表达，而不是权威词源判断。`;
}
function buildWhyItFits(seed, userText, scene) {
	const [firstClue, secondClue] = pickInputClues(userText);
	const scenePhrase = scene === "书影音余韵" ? "体验余韵" : scene;
	const meaning = shortenMeaning(seed.shortMeaning);
	return `这次我会更偏向 ${seed.word}。你写到“${firstClue}”，又提到“${secondClue}”，两处线索放在一起，说明你想表达的是一个和具体处境连在一起的感受。放在“${scenePhrase}”里，它和“${meaning}”更接近。`;
}
function buildShareCopy(seed, scene) {
	return `原来 ${{
		亲密关系: "这段关系里那种说不太直的感觉",
		日常瞬间: "这个看起来普通、其实有点重的瞬间",
		书影音余韵: "作品结束后还留在心里的那点余波",
		友情家庭: "这份既亲近又复杂的牵连",
		工作学业: "这种被压力、期待和责任缠住的状态",
		自我追问: "此刻这份还没想明白的自我追问"
	}[scene]}，可以用 ${seed.word} 来说。`;
}
function alternativeReason(seed) {
	return `它也靠近这类感受，但更偏向“${seed.shortMeaning}”`;
}
function buildFallbackResult(userText, scene, precisionContext = "") {
	const fallback = fallbackWordsByScene[scene];
	return {
		word: fallback.word,
		language: fallback.language,
		pronunciation: fallback.pronunciation,
		shortMeaning: fallback.shortMeaning,
		matchConfidence: "medium",
		whyItFits: fallback.whyItFits([userText, precisionContext].filter(Boolean).join("\n"), scene),
		cultureNote: fallback.cultureNote,
		precision: buildPrecisionResult(userText, scene, fallback.word, precisionContext),
		alternatives: [],
		shareCopy: fallback.shareCopy,
		safetyNote: fallbackSafetyNote
	};
}
async function mockMatchWord(userText, scene, excludedWord, precisionContext = "") {
	await new Promise((resolve) => globalThis.setTimeout(resolve, 650));
	const matchText = [userText, precisionContext].filter(Boolean).join("\n");
	const semanticFrame = extractMockSemanticFrame(matchText);
	const rankedSeeds = [...wordSeeds].filter((seed) => seed.word !== excludedWord).map((seed, index) => {
		const semanticScore = semanticSeedScore(seed, semanticFrame);
		return {
			seed,
			score: scoreSeed(seed, matchText, scene) + semanticScore.total,
			semanticScore,
			index
		};
	}).sort((a, b) => b.score - a.score || a.index - b.index);
	const winner = rankedSeeds[0]?.seed ?? wordSeeds[0];
	const winnerScore = rankedSeeds[0]?.score ?? 0;
	const firstRoundConfidence = inferMatchConfidence(winnerScore);
	if (firstRoundConfidence === "low") return buildFallbackResult(userText, scene, precisionContext);
	const alternativeFloor = Math.max(18, winnerScore - 6);
	const alternatives = rankedSeeds.slice(1).filter(({ seed, score, semanticScore }) => seed.word !== winner.word && score >= alternativeFloor && score >= winnerScore * .72 && semanticScore.coreFit + semanticScore.emotionFit >= 3 && semanticScore.motifFit < semanticScore.coreFit + semanticScore.emotionFit).slice(0, 2).map(({ seed }) => ({
		word: seed.word,
		language: seed.language,
		reason: alternativeReason(seed)
	}));
	return {
		word: winner.word,
		language: winner.language,
		pronunciation: winner.pronunciation,
		shortMeaning: winner.shortMeaning,
		matchConfidence: firstRoundConfidence,
		whyItFits: buildWhyItFits(winner, matchText, scene),
		cultureNote: sourceAwareCultureNote(winner),
		precision: buildPrecisionResult(userText, scene, winner.word, precisionContext),
		alternatives,
		shareCopy: buildShareCopy(winner, scene),
		safetyNote: fallbackSafetyNote
	};
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BhscTP4V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function matchWord(input) {
	if (typeof window !== "undefined") try {
		const response = await fetch("/api/match-word", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(input)
		});
		if (response.ok) return await response.json();
		const payload = await response.json().catch(() => null);
		throw new Error(payload?.error || "词语匹配服务暂时不可用。");
	} catch (err) {
		if (err instanceof Error && err.message && !err.message.includes("fetch")) throw err;
		throw new Error("词语匹配服务暂时不可用，请稍后重试。");
	}
	return mockMatchWord(input.userText, input.scene, input.excludedWord, input.precisionContext);
}
var KEY = "ycqx:seen-intro";
/** CJK custom fonts we want to preload before showing content */
var CJK_FONTS = [
	"Huiwen Mincho",
	"Xiaodou Utopia",
	"WuQiu Hand"
];
function Intro() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [entering, setEntering] = (0, import_react.useState)(false);
	const [fontsReady, setFontsReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		async function loadFonts() {
			try {
				const loads = CJK_FONTS.map((family) => document.fonts.load(`1em "${family}"`).catch(() => {}));
				await Promise.allSettled(loads);
				if (document.fonts?.ready) await document.fonts.ready;
			} catch {}
			setTimeout(() => setFontsReady(true), 2e3);
		}
		loadFonts();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!fontsReady) return;
		try {
			if (!sessionStorage.getItem(KEY)) setOpen(true);
		} catch {
			setOpen(true);
		}
	}, [fontsReady]);
	const enter = () => {
		if (entering) return;
		setEntering(true);
		try {
			sessionStorage.setItem(KEY, "1");
		} catch {}
		setTimeout(() => setOpen(false), 1200);
	};
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const t = setTimeout(enter, 6500);
		return () => clearTimeout(t);
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, { children: [!fontsReady && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "fixed inset-0 z-[70] flex items-center justify-center overflow-hidden",
		exit: { opacity: 0 },
		transition: { duration: .5 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0",
			style: {
				backgroundColor: "var(--paper)",
				backgroundImage: "radial-gradient(var(--grain-a) 1px, transparent 1px), radial-gradient(var(--grain-b) 1px, transparent 1px)",
				backgroundSize: "3px 3px, 7px 7px"
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "relative z-10 flex flex-col items-center gap-6",
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			transition: { duration: .6 },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "font-serif text-6xl leading-none text-foreground sm:text-7xl",
					initial: {
						opacity: 0,
						y: 12,
						filter: "blur(4px)"
					},
					animate: {
						opacity: 1,
						y: 0,
						filter: "blur(0px)"
					},
					transition: {
						duration: .9,
						ease: "easeOut"
					},
					children: "有词可栖"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					className: "font-cn text-sm text-ink-soft",
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: {
						delay: .6,
						duration: .7
					},
					children: "字体正在加载⋯"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "h-[1px] w-12",
					style: {
						background: "var(--rule)",
						transformOrigin: "left"
					},
					initial: { scaleX: 0 },
					animate: { scaleX: [
						0,
						1,
						0
					] },
					transition: {
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut"
					}
				})
			]
		})]
	}, "loading"), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "fixed inset-0 z-[60] flex items-center justify-center overflow-hidden",
		initial: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: .6 },
		onClick: enter,
		role: "button",
		"aria-label": "进入有词可栖",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				style: {
					backgroundColor: "var(--paper)",
					backgroundImage: "radial-gradient(var(--grain-a) 1px, transparent 1px), radial-gradient(var(--grain-b) 1px, transparent 1px)",
					backgroundSize: "3px 3px, 7px 7px"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute inset-y-0 left-0 w-1/2 origin-left",
				style: {
					backgroundColor: "var(--paper)",
					boxShadow: "inset -1px 0 0 var(--rule)"
				},
				initial: false,
				animate: entering ? { x: "-100%" } : { x: 0 },
				transition: {
					duration: 1.1,
					ease: [
						.76,
						0,
						.24,
						1
					]
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute inset-y-0 right-0 w-1/2 origin-right",
				style: {
					backgroundColor: "var(--paper)",
					boxShadow: "inset 1px 0 0 var(--rule)"
				},
				initial: false,
				animate: entering ? { x: "100%" } : { x: 0 },
				transition: {
					duration: 1.1,
					ease: [
						.76,
						0,
						.24,
						1
					]
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "relative z-10 mx-auto flex max-w-md flex-col items-center px-8 text-center",
				initial: { opacity: 0 },
				animate: { opacity: entering ? 0 : 1 },
				transition: { duration: .6 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							letterSpacing: "0.4em"
						},
						animate: {
							opacity: 1,
							letterSpacing: "0.28em"
						},
						transition: {
							duration: 1.4,
							ease: "easeOut"
						},
						className: "font-meta text-[10px] uppercase leading-none text-ink-soft",
						style: { letterSpacing: "0.28em" },
						children: "A Lexicon for Feelings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { scaleX: 0 },
						animate: { scaleX: 1 },
						transition: {
							duration: 1.1,
							delay: .4,
							ease: "easeOut"
						},
						style: {
							transformOrigin: "center",
							height: 1,
							width: 72,
							marginTop: 20,
							background: "var(--rule)"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-8 flex items-baseline gap-1 font-serif text-6xl leading-none tracking-tight text-foreground sm:text-7xl",
						children: "有词可栖".split("").map((ch, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							initial: {
								opacity: 0,
								y: 18,
								filter: "blur(6px)"
							},
							animate: {
								opacity: 1,
								y: 0,
								filter: "blur(0px)"
							},
							transition: {
								duration: .9,
								delay: .6 + i * .28,
								ease: "easeOut"
							},
							children: ch
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.p, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: 1,
							delay: 2
						},
						className: "mt-8 font-cn text-sm leading-relaxed text-ink-soft",
						children: [
							"给说不清的感受，",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"一个可以停靠的词。"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						transition: {
							duration: .8,
							delay: 3
						},
						className: "mt-14 flex flex-col items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-meta text-[10px] uppercase tracking-[0.32em] text-ink-soft",
							children: "Tap anywhere to enter"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							animate: { y: [
								0,
								4,
								0
							] },
							transition: {
								duration: 1.8,
								repeat: Infinity,
								ease: "easeInOut"
							},
							className: "font-meta text-base leading-none text-ink-soft",
							children: "↓"
						})]
					})
				]
			})
		]
	}, "intro")] });
}
var fadeUp = {
	hidden: {
		opacity: 0,
		y: 14
	},
	show: {
		opacity: 1,
		y: 0
	}
};
var loadingSteps = [
	"先把这段感受拆成线索",
	"检查词义有没有真正贴住",
	"避开只像、但不准的近义词",
	"去更远一点的语境里找",
	"把候选词再核对一遍"
];
function inferScene(text) {
	const normalized = text.toLocaleLowerCase();
	return [
		["书影音余韵", [
			"电影",
			"书",
			"歌",
			"音乐",
			"演出",
			"作品",
			"影院",
			"散场",
			"movie",
			"music",
			"book"
		]],
		["亲密关系", [
			"喜欢",
			"恋人",
			"分手",
			"暧昧",
			"亲密",
			"拥抱",
			"想念他",
			"想念她",
			"相处",
			"对方",
			"陌生感",
			"抵触感",
			"relationship"
		]],
		["友情家庭", [
			"朋友",
			"家人",
			"妈妈",
			"爸爸",
			"父母",
			"家庭",
			"同学",
			"friend",
			"family"
		]],
		["工作学业", [
			"工作",
			"老板",
			"同事",
			"考试",
			"作业",
			"论文",
			"项目",
			"deadline",
			"work",
			"school"
		]],
		["日常瞬间", [
			"阳光",
			"雨",
			"地铁",
			"路上",
			"窗",
			"咖啡",
			"夜晚",
			"清晨",
			"daily"
		]]
	].find(([, words]) => words.some((word) => normalized.includes(word)))?.[0] ?? "自我追问";
}
function Index() {
	const [text, setText] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	const [resultEntry, setResultEntry] = (0, import_react.useState)(null);
	const [revealWord, setRevealWord] = (0, import_react.useState)(SAMPLE);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [errorMessage, setErrorMessage] = (0, import_react.useState)(null);
	const [loadingStep, setLoadingStep] = (0, import_react.useState)(0);
	const [revealing, setRevealing] = (0, import_react.useState)(false);
	const resultRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!loading) {
			setLoadingStep(0);
			return;
		}
		const interval = window.setInterval(() => {
			setLoadingStep((step) => (step + 1) % loadingSteps.length);
		}, 1800);
		return () => window.clearInterval(interval);
	}, [loading]);
	const completeMatch = async (userText, scene) => {
		setLoading(true);
		try {
			const silentCtx = buildSilentPrecisionContext(userText, scene);
			const entry = addHistoryEntry(await matchWord({
				userText,
				scene,
				excludedWord: result?.word,
				precisionContext: silentCtx
			}), userText, scene);
			const withInput = toWordResult(entry, userText, entry.seq);
			setRevealWord(withInput);
			setLoading(false);
			setRevealing(true);
			setTimeout(() => {
				setResult(withInput);
				setResultEntry(entry);
				saveLastWord(withInput);
				requestAnimationFrame(() => {
					resultRef.current?.scrollIntoView({
						behavior: "smooth",
						block: "start"
					});
				});
				setTimeout(() => setRevealing(false), 700);
			}, 1700);
		} catch (err) {
			console.error("matchWord failed:", err);
			setErrorMessage(err instanceof Error ? err.message : "匹配失败，请稍后再试");
			setLoading(false);
			setRevealing(false);
		}
	};
	const onSubmit = async () => {
		const userText = text.trim();
		if (!userText) return;
		await completeMatch(userText, inferScene(userText));
	};
	const confirmAlternative = (alternative, detail) => {
		if (!resultEntry) return;
		const updatedEntry = replaceHistoryEntry(resultEntry, {
			...resultEntry,
			word: alternative.word,
			language: alternative.language,
			pronunciation: "",
			shortMeaning: detail?.shortMeaning ?? alternative.hint,
			whyItFits: detail?.whyItFits ?? `你选择了这个备选词作为更贴切的表达：${alternative.hint}`,
			cultureNote: detail?.cultureNote ?? "这是本次匹配里的备选词。",
			shareCopy: detail?.shareCopy ?? `${alternative.word}：${alternative.hint}`,
			alternatives: [{
				word: resultEntry.word,
				language: resultEntry.language,
				reason: "原先推荐的主词。"
			}, ...resultEntry.alternatives.filter((item) => item.word !== alternative.word || item.language !== alternative.language)].slice(0, 3)
		});
		const updatedResult = toWordResult(updatedEntry, updatedEntry.userText, updatedEntry.seq);
		setResultEntry(updatedEntry);
		setResult(updatedResult);
		saveLastWord(updatedResult);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-x-clip",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intro, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthBackground, { zoom: revealing ? 1 : 0 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.header, {
				initial: "hidden",
				animate: "show",
				variants: { show: { transition: { staggerChildren: .08 } } },
				className: "relative z-10 mx-auto max-w-3xl px-6 pt-10 sm:pt-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						variants: fadeUp,
						transition: {
							duration: .55,
							ease: "easeOut"
						},
						className: "flex items-center justify-between font-meta text-[11px] uppercase tracking-[0.28em] text-ink-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "No. 001" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "A Lexicon for Feelings"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Vol. I" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: {
							hidden: { scaleX: 0 },
							show: { scaleX: 1 }
						},
						transition: {
							duration: .85,
							ease: "easeOut"
						},
						style: { transformOrigin: "left" },
						className: "mt-6 hairline"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
						variants: fadeUp,
						transition: {
							duration: .7,
							ease: "easeOut"
						},
						className: "mt-8 font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl",
						children: "有词可栖"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.p, {
						variants: fadeUp,
						transition: {
							duration: .7,
							ease: "easeOut"
						},
						className: "mt-4 max-w-xl font-cn text-base leading-relaxed text-ink-soft sm:text-lg",
						children: [
							"给说不清的感受，",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "sm:hidden" }),
							"一个可以停靠的词。"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: {
							hidden: { scaleX: 0 },
							show: { scaleX: 1 }
						},
						transition: {
							duration: .85,
							ease: "easeOut",
							delay: .1
						},
						style: { transformOrigin: "left" },
						className: "mt-8 hairline"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
				initial: {
					opacity: 0,
					y: 14
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .55,
					ease: "easeOut",
					delay: .28
				},
				className: "relative z-10 mx-auto mt-8 max-w-3xl px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between gap-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft",
							children: "写下此刻的感受"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group mt-3 rounded-md border border-border bg-card shadow-[0_1px_0_rgba(0,0,0,0.02),0_20px_40px_-30px_rgba(60,40,20,0.25)] transition focus-within:border-foreground/40 focus-within:shadow-[0_1px_0_rgba(0,0,0,0.02),0_30px_60px_-30px_rgba(60,40,20,0.4)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: text,
							onChange: (e) => setText(e.target.value),
							placeholder: "例如：明明很久没见了，却在一首歌响起的瞬间，整个人被拽回那个夏天的下午……",
							rows: 6,
							className: "block w-full resize-none rounded-md bg-transparent p-5 font-cn text-lg leading-relaxed text-foreground placeholder:text-ink-soft/60 focus:outline-none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-t border-border px-5 py-2.5 text-xs text-ink-soft",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-cn tracking-wide",
								children: [text.length, " 字 · 中文 / English 皆可"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-cn",
								children: "— 你的便签"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
							whileHover: { y: -1 },
							whileTap: { scale: .97 },
							onClick: onSubmit,
							disabled: !text.trim() || loading || revealing,
							className: "group inline-flex h-[52px] items-center gap-3 whitespace-nowrap rounded-full bg-foreground px-7 font-meta text-base leading-none tracking-wide text-primary-foreground transition hover:opacity-90 disabled:opacity-40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: loading ? "正在为你寻词…" : "找到我的词" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								animate: loading ? { x: [
									0,
									4,
									0
								] } : { x: 0 },
								transition: {
									repeat: loading ? Infinity : 0,
									duration: 1.1,
									ease: "easeInOut"
								},
								children: "→"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-sm text-ink-soft",
							children: "「每一种感受，都值得一个名字。」"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingTrace, { step: loadingStep }) : null }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 6
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -4
						},
						className: "mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 font-cn text-sm text-red-700",
						children: [errorMessage, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setErrorMessage(null),
							className: "ml-3 underline hover:text-red-900",
							children: "关闭"
						})]
					}) : null })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				ref: resultRef,
				className: "relative z-10 mx-auto mt-16 max-w-3xl px-6 pb-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
						data: result,
						entry: resultEntry,
						onAlternativeConfirm: confirmAlternative
					}, result.seq ?? result.word) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyShelf, {}, "empty")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative z-10 mx-auto max-w-3xl px-6 pb-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex items-center justify-between",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/harbor",
							className: "group inline-flex items-baseline gap-3 font-meta text-base leading-none text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "underline decoration-border decoration-1 underline-offset-[6px] transition group-hover:decoration-foreground",
								children: "翻看你停靠过的词"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft transition group-hover:translate-x-0.5",
								children: "Harbor →"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-20 text-center font-meta text-xs leading-none text-ink-soft",
						children: "有词可栖 · 一本为情绪做的小词典"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: revealing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealOverlay, { word: revealWord }) })
		]
	});
}
function LoadingTrace({ step }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: -6
		},
		transition: {
			duration: .28,
			ease: "easeOut"
		},
		className: "mt-5 overflow-hidden rounded-md border border-border bg-card px-4 py-4 shadow-[0_18px_45px_-32px_rgba(60,40,20,0.5)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-9 w-9 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					className: "absolute inset-0 rounded-full border border-foreground/20",
					animate: {
						scale: [
							1,
							1.2,
							1
						],
						opacity: [
							.9,
							.35,
							.9
						]
					},
					transition: {
						duration: 1.8,
						repeat: Infinity,
						ease: "easeInOut"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					className: "absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-foreground",
					style: {
						marginLeft: -4,
						marginTop: -4
					},
					animate: {
						y: [
							0,
							-9,
							0
						],
						opacity: [
							.5,
							1,
							.5
						]
					},
					transition: {
						duration: 1.1,
						repeat: Infinity,
						ease: "easeInOut"
					}
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -8
						},
						transition: {
							duration: .32,
							ease: "easeOut"
						},
						className: "font-cn text-sm font-medium leading-6 text-foreground",
						children: loadingSteps[step]
					}, step)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid grid-cols-5 gap-1",
					children: loadingSteps.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "h-px rounded-full bg-foreground/20",
						animate: {
							opacity: index === step ? 1 : .22,
							scaleX: index === step ? 1 : .75
						},
						transition: {
							duration: .3,
							ease: "easeOut"
						},
						style: { transformOrigin: "left" }
					}, item))
				})]
			})]
		})
	});
}
function EmptyShelf() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: {
			duration: .5,
			delay: .6
		},
		className: "rounded-md border border-dashed border-border bg-card/40 px-6 py-8 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-cn text-sm text-ink-soft",
			children: "在上方写下一段感受，让一枚远方的词来认领它。"
		})
	});
}
function RevealOverlay({ word }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: {
			duration: .7,
			ease: "easeOut"
		},
		className: "fixed inset-0 z-50 flex items-center justify-center bg-paper/95 backdrop-blur-sm",
		style: {
			backgroundImage: "radial-gradient(oklch(0.85 0.02 80 / 0.18) 1px, transparent 1px), radial-gradient(oklch(0.78 0.02 60 / 0.10) 1px, transparent 1px)",
			backgroundSize: "3px 3px, 7px 7px"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: { opacity: 0 },
					transition: {
						delay: .15,
						duration: .5
					},
					className: "font-meta text-[11px] uppercase tracking-[0.4em] text-ink-soft",
					children: "为你寻得一枚词"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { scaleX: 0 },
					animate: { scaleX: 1 },
					exit: { opacity: 0 },
					transition: {
						delay: .3,
						duration: .6,
						ease: "easeOut"
					},
					style: { transformOrigin: "center" },
					className: "mx-auto mt-6 h-px w-24 bg-rule"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
					layoutId: "hero-word",
					initial: {
						opacity: 0,
						y: 24,
						filter: "blur(10px)"
					},
					animate: {
						opacity: 1,
						y: 0,
						filter: "blur(0px)"
					},
					transition: {
						delay: .5,
						duration: .9,
						ease: [
							.16,
							.84,
							.24,
							1
						]
					},
					className: "mt-8 break-words font-serif text-6xl leading-none tracking-tight text-foreground sm:text-8xl",
					children: word.word
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					transition: {
						delay: 1,
						duration: .5
					},
					className: "mt-6 font-meta text-xs uppercase tracking-[0.32em] text-ink-soft",
					children: [
						word.language,
						" · ",
						word.pronunciation
					]
				})
			]
		})
	});
}
function ResultCard({ data, entry, onAlternativeConfirm }) {
	const navigate = useNavigate();
	const [kept, setKept] = (0, import_react.useState)(false);
	const [pendingAlternative, setPendingAlternative] = (0, import_react.useState)(null);
	const [altDetail, setAltDetail] = (0, import_react.useState)(null);
	const [altLoading, setAltLoading] = (0, import_react.useState)(false);
	const container = {
		hidden: {},
		show: { transition: {
			staggerChildren: .12,
			delayChildren: .1
		} }
	};
	(0, import_react.useEffect)(() => {
		setKept(entry?.saved ?? false);
		setPendingAlternative(null);
		setAltDetail(null);
		setAltLoading(false);
	}, [entry?.id, entry?.saved]);
	const handleAltClick = (a) => {
		setPendingAlternative(a);
		setAltDetail(null);
		setAltLoading(true);
		const userText = entry ? entry.userText ?? "" : "";
		const scene = entry?.scene ?? "";
		fetch("/api/alternative-detail", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				word: a.word,
				language: a.language,
				userText,
				scene
			})
		}).then((r) => r.json()).then((d) => {
			if (d.error) throw new Error(d.error);
			setAltDetail(d);
		}).catch(() => setAltDetail(null)).finally(() => setAltLoading(false));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.article, {
		initial: {
			opacity: 0,
			scale: .7,
			filter: "blur(18px)",
			y: 30
		},
		animate: {
			opacity: 1,
			scale: 1,
			filter: "blur(0px)",
			y: 0
		},
		exit: {
			opacity: 0,
			scale: .96,
			filter: "blur(6px)",
			y: 12
		},
		transition: {
			duration: 1.1,
			ease: [
				.16,
				.84,
				.24,
				1
			]
		},
		className: "relative min-w-0 overflow-hidden rounded-md border border-border bg-card p-8 shadow-[0_30px_60px_-40px_rgba(60,40,20,0.35)] sm:p-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			variants: container,
			initial: "hidden",
			animate: "show",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: fadeUp,
					className: "flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-meta text-[11px] uppercase tracking-[0.28em] text-ink-soft",
						children: "为你寻得 · A Word For You"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setKept((v) => !v);
							if (entry) toggleSavedWord(entry);
						},
						"aria-label": kept ? "已留下" : "想留下这枚词",
						className: "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-cn text-xs transition " + (kept ? "border-foreground text-foreground" : "border-border text-ink-soft hover:border-foreground hover:text-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-serif text-base leading-none",
							children: kept ? "❥" : "♡"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: kept ? "已留下" : "想留下" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
					layoutId: "hero-word",
					transition: {
						duration: .9,
						ease: [
							.16,
							.84,
							.24,
							1
						]
					},
					className: "mt-4 break-words font-serif text-6xl leading-none tracking-tight text-foreground sm:text-7xl",
					children: data.word
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: fadeUp,
					className: "mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-1 font-sans text-sm text-ink-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data.language }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif",
						children: data.pronunciation
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					variants: fadeUp,
					className: "my-8 hairline"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					variants: fadeUp,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefRow, {
						label: "中文含义",
						children: data.meaning
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					variants: fadeUp,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefRow, {
						label: "为什么适合你",
						children: data.whyForYou
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					variants: fadeUp,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefRow, {
						label: "文化说明",
						children: data.culture
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: fadeUp,
					className: "mt-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft",
							children: "备选词 · Adjacent Words"
						}),
						data.alternatives.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 divide-y divide-border border-y border-border",
							children: data.alternatives.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => handleAltClick(a),
									className: "flex w-full min-w-0 flex-col gap-1 text-left transition hover:bg-note/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 sm:flex-row sm:items-baseline sm:gap-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-0 break-words font-serif text-xl text-foreground sm:min-w-[140px]",
											children: a.word
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-0 break-words font-meta text-[11px] uppercase tracking-[0.2em] text-ink-soft sm:min-w-[88px]",
											children: a.language
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "break-words font-cn text-sm text-ink-soft",
											children: a.hint
										})
									]
								}), pendingAlternative?.word === a.word && pendingAlternative.language === a.language ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 rounded-md border border-border bg-note/70 p-4",
									children: altLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-cn text-sm text-ink-soft",
										children: [
											"正在查找「",
											a.word,
											"」的详情…"
										]
									}) : altDetail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-meta text-[10px] uppercase tracking-[0.2em] text-ink-soft",
													children: "中文含义"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 font-cn text-sm text-foreground",
													children: altDetail.shortMeaning
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-meta text-[10px] uppercase tracking-[0.2em] text-ink-soft",
													children: "为什么适合你"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 font-cn text-sm text-foreground",
													children: altDetail.whyItFits
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-meta text-[10px] uppercase tracking-[0.2em] text-ink-soft",
													children: "文化说明"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 font-cn text-sm text-foreground",
													children: altDetail.cultureNote
												})] })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 hairline" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-3 font-cn text-sm text-foreground",
											children: [
												"这个是不是更贴切？确认后，只把「",
												a.word,
												"」计入停靠过的词。"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex flex-wrap gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => onAlternativeConfirm(a, altDetail),
												className: "inline-flex h-8 items-center rounded-full bg-foreground px-4 font-cn text-xs text-primary-foreground transition hover:opacity-90",
												children: "是，停靠这个词"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setPendingAlternative(null),
												className: "inline-flex h-8 items-center rounded-full border border-border px-4 font-cn text-xs text-ink-soft transition hover:border-foreground hover:text-foreground",
												children: "先不换"
											})]
										})
									] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-cn text-sm text-red-700",
										children: "获取详情失败"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 flex flex-wrap gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setPendingAlternative(null),
											className: "inline-flex h-8 items-center rounded-full border border-border px-4 font-cn text-xs text-ink-soft transition hover:border-foreground hover:text-foreground",
											children: "关闭"
										})
									})] })
								}) : null]
							}, `${a.language}-${a.word}`))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 border-y border-border py-4 font-cn text-sm text-ink-soft",
							children: "没有其他合适的选择"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackButtons, {
							data,
							entry
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: fadeUp,
					className: "mt-10 rounded-md bg-note p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft",
							children: "分享卡片文案"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 break-words whitespace-pre-line font-serif text-lg leading-relaxed text-foreground",
							children: data.shareText
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
								whileHover: { y: -1 },
								whileTap: { scale: .97 },
								onClick: () => navigate({ to: "/share" }),
								className: "inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full bg-foreground px-5 font-meta text-sm leading-none tracking-wide text-primary-foreground transition hover:opacity-90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "去做一张分享卡" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => navigator.clipboard?.writeText(data.shareText),
								className: "inline-flex h-9 items-center whitespace-nowrap rounded-full border border-border px-4 font-meta text-sm leading-none tracking-wide text-ink-soft transition hover:border-foreground hover:text-foreground",
								children: "复制文案"
							})]
						})
					]
				})
			]
		})
	});
}
function DefRow({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 gap-2 py-4 sm:grid-cols-[160px_1fr] sm:gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "break-words font-cn text-base leading-[1.85] text-foreground",
			children
		})]
	});
}
function FeedbackButtons({ data, entry }) {
	const [rating, setRating] = (0, import_react.useState)(null);
	const userText = entry ? entry.userText ?? "" : "";
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || !userText) {
			setRating(null);
			return;
		}
		try {
			const raw = window.localStorage.getItem("ycqx:feedback");
			if (!raw) {
				setRating(null);
				return;
			}
			const parsed = JSON.parse(raw);
			if (parsed.word === data.word && parsed.userText === userText) setRating(parsed.rating ?? null);
			else setRating(null);
		} catch {
			setRating(null);
		}
	}, [data.word, userText]);
	const saveFeedback$1 = (nextRating) => {
		if (typeof window === "undefined") return;
		if (entry) saveFeedback(data, userText, entry.scene, nextRating);
		const payload = {
			word: data.word,
			userText,
			rating: nextRating,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		};
		window.localStorage.setItem("ycqx:feedback", JSON.stringify(payload));
		setRating(nextRating);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 flex items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft",
				children: "反馈"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-pressed": rating === "准",
				onClick: () => saveFeedback$1("准"),
				className: "inline-flex h-7 items-center gap-1.5 rounded-full border px-3 font-cn text-xs transition " + (rating === "准" ? "border-foreground text-foreground" : "border-border text-ink-soft hover:border-foreground hover:text-foreground"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					className: "text-sm leading-none",
					children: rating === "准" ? "●" : "○"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "准" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-pressed": rating === "不准",
				onClick: () => saveFeedback$1("不准"),
				className: "inline-flex h-7 items-center gap-1.5 rounded-full border px-3 font-cn text-xs transition " + (rating === "不准" ? "border-foreground text-foreground" : "border-border text-ink-soft hover:border-foreground hover:text-foreground"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					className: "text-sm leading-none",
					children: rating === "不准" ? "●" : "○"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "不准" })]
			})
		]
	});
}
//#endregion
export { Index as component };
