# Regalis Japan Group — サイト全面改修 実装プロンプト

## 概要・目的
`/Users/wantan/regalis-co` にある Jekyll コーポレートサイトを、以下のブランド戦略に基づいて全面改修する。
デプロイ先: `https://regalis-order-suits.com/group/`（regalis-hp リポジトリ経由）

---

## ブランド戦略の核心

### ポジショニング
**井上幹太 = 機会建築家（Opportunity Architect）**
> 「機会が届いていない場所に、機会を設計し直すこと」が代表の一貫した行動原理。

### 会社理念
> **「あなたが主役の時代をつくる。」**

サブコピー（日本語）:
> 不登校から、世界舞台へ。12年間の孤独が教えてくれたのは、「機会は与えられるものではなく、建築するものだ」ということ。私たちは、その建築術を、企業と次世代に届ける会社です。

### Opportunity Loop（3事業の循環構造）
```
ORATIO（発信）→ PRAXIS（企業支援）→ ACADEMIA（学生機会）→ ORATIO（発信）
```
- **ORATIO→PRAXIS**: 代表の発信が企業の問い合わせを生む（広告費ゼロのリード獲得）
- **PRAXIS→ACADEMIA**: 企業案件に学生をインターンとして送り込む
- **ACADEMIA→ORATIO**: 学生の挑戦ストーリーが次の発信素材になる

---

## サイト構成（改修後）

### ナビゲーション（全て日本語）
```
ロゴ | 代表について | 3つの事業 | 会社概要 | お問い合わせ | [スーツブランドへ↗]
```

### ページ一覧
| ファイルパス | 内容 | 優先度 |
|---|---|---|
| `index.html` | トップページ（全面刷新） | ★★★ |
| `about/ceo.html` | **代表紹介**（新設・members.htmlを廃止） | ★★★ |
| `about/message.html` | 代表メッセージ（更新） | ★★ |
| `about/company.html` | 会社概要（軽微更新） | ★ |
| `business/praxis/index.html` | PRAXIS — AI・DXコンサル（新設） | ★★★ |
| `business/academia/index.html` | ACADEMIA — 学生機会創出（新設） | ★★★ |
| `business/oratio/index.html` | ORATIO — 代表発信・タレント（新設） | ★★★ |
| `business/index.html` | グループ事業一覧（後景5事業も掲載） | ★★ |
| `contact/index.html` | お問い合わせ（動線強化） | ★★★ |

---

## トップページ（index.html）の設計

### セクション構成（上から順）

#### 1. ファーストビュー（HERO）
```
[背景: ダーク + ゴールドラインのグリッド]

上部バッジ: 「機会建築家 / Opportunity Architect」

メインコピー（日本語大見出し）:
「あなたが主役の
 時代をつくる。」

サブコピー:
「不登校12年から、20歳で持株会社CEO。
 人生の全てを機会の設計に捧げてきた
 建築家が、あなたの未来を設計します。」

CTA ボタン（2つ）:
[代表のストーリーを見る] [無料相談はこちら]

右サイド: 代表写真 /images/_顔写真_ビジネス用黒服-背景白.png
```

#### 2. 代表タイムライン（CEOストーリーのダイジェスト）
```
見出し: 「機会を建築してきた、20年間の軌跡」

タイムライン（左右交互のカード式）:
- 12歳「12年間の不登校が始まる。学校の外で、世界と出会う。」
- 14歳「Webライターとして独立。最初の"経済的機会"を自分で作る。」
- 17歳「S高等学校 入学。国際経済学オリンピック 世界3位。」
- 18歳「J-StarX Finland 第1期採択。Aalto大学で起業家精神を学ぶ。」
- 19歳「学生団体FIN/School.（金融教育）・ESF（AI教育）創業。UNION CTO就任（学生700名）。」
- 20歳「Google AI Ambassador 第1期。Regalis Japan Group 設立。」

CTA: [代表の全ストーリーを読む →]
```

#### 3. 3つの事業柱（Opportunity Loop）
```
見出し: 「3つの機会建築、1つの循環。」
サブ: 「企業・次世代・社会。三者を繋ぐ Opportunity Loop が、持続的な変革を生む。」

カード（横並び3枚）:

[PRAXIS]
AI・DXコンサルティング
「企業に、変革の機会を。」
対象: 中小企業・スタートアップ
→ 詳細を見る

[ACADEMIA]  
学生機会創出事業
「次世代に、挑戦の機会を。」
対象: 大学生・不登校経験者
→ 詳細を見る

[ORATIO]
代表発信・タレント活動
「社会に、問いかける機会を。」
対象: メディア・講演主催者
→ 依頼する
```

#### 4. 3事業の関係性（Opportunity Loop 図解）
```
見出し: 「なぜ、この3つが繋がるのか。」

[SVGまたはCSSで描く循環矢印図]
ORATIO（認知を生む）
    ↓
PRAXIS（売上を生む）
    ↓
ACADEMIA（人材と信頼を生む）
    ↓
ORATIO（次の素材を生む）

説明文: 「代表の発信が企業からの問い合わせを生み、
企業案件に学生が挑戦し、学生の挑戦が次の発信素材になる。
この循環が広告費ゼロで機能するのは、
3つの事業が代表1人の人生で完全に接続されているからです。」
```

#### 5. 代表紹介カード（中間CTA）
```
[左: 代表写真 /images/kanta_kyoto-suits.jpg（京都スーツ写真）]
[右: テキスト]

「井上 幹太 / Kanta Inoue
 代表取締役 CEO & Founder
 機会建築家 / Opportunity Architect」

「12年間の不登校が、私を機会建築家にしました。
 学校の外で経済を学び、海外で起業家精神を学び、
 Googleが認めた初代AIアンバサダーとして動き、
 20歳で持株会社を設立しました。

 この会社は、私の人生の延長です。
 あなたの機会を設計するために、存在しています。」

CTA: [代表の詳細プロフィールへ] [直接相談する]
```

#### 6. オーガニックリード獲得セクション
```
見出し: 「まず、話してみてください。」
サブ: 「相談無料。30分のオンライン対話から始まります。」

3つのカード（相談カテゴリ別）:

[企業の方へ]
AI・DX導入の相談
補助金・自動化・業務改善
→ 無料相談を予約する

[学生・若者の方へ]
アンバサダーへの参加
不登校・進路・キャリアの相談
→ 参加を検討する

[メディア・主催者の方へ]
井上幹太への取材・登壇依頼
→ 依頼フォームへ
```

#### 7. グループ事業（後景・コンパクト表示）
```
見出し: 「グループが持つ、5つの武器。」
サブ: 「前面3事業の付随サービスとして、必要に応じてご提供します。」

[小さいカードで横並び]
- Regalis Atelier（オーダースーツ） ↗ 別サイト
- Regalis Codex（Web開発） ※Praxis付随
- Regalis Vanguard（営業代行） ※個別提案
- Regalis Chronicle（メディア代行） ※Praxis付随
- Regalis Lumen（レーザー製品） Coming Soon
```

#### 8. フッター直前CTA
```
「今日、最初の一歩を踏み出す。」
[無料相談を申し込む] ← メインCTA（大ボタン）
```

---

## 代表紹介ページ（about/ceo.html）の設計

### 使用する画像
- ヘロー写真: `/images/【顔写真】井上幹太_スイス国連.jpg`（スイス国連・フォーマル）
- スーツ写真: `/images/kanta_kyoto-suits.jpg`（京都・スーツ姿）
- ビジネス写真: `/images/_顔写真_ビジネス用黒服-背景白.png`（黒服・白背景）

### セクション構成
```
[1] ファーストビュー
  キャプション: 「機会建築家の履歴書」
  大見出し: 「井上 幹太」
  英語: 「Kanta Inoue — Opportunity Architect」
  写真: スイス国連写真（大）

[2] ポジショニング宣言
  「私が"機会建築家"と名乗る理由」
  本文: 12年間の不登校から始まる物語を、
  「機会建築」という一つの言葉で統合するストーリー

[3] 人生タイムライン（詳細版）
  各マイルストーンに「機会建築の証左」を添える
  ※上記トップページのタイムラインの詳細版

[4] 経歴・実績
  - S高等学校 金融/投資/政治部
  - 国際経済学オリンピック 世界3位
  - J-StarX Finland 第1期採択
  - Aalto University（フィンランド）
  - 学生団体FIN/School.創業（金融教育）
  - 学生団体ESF創業（AI教育）
  - UNION CTO（学生連合700名）
  - Google AI Ambassador 第1期
  - 日本学生アンバサダー協会 設立
  - Regalis Japan Group 設立（代表取締役）

[5] メディア・登壇実績
  「取材・出演・講演のご依頼はこちら」→ お問い合わせへ

[6] CTA
  [AI/DX相談をする] [取材依頼はこちら] [アンバサダーに参加する]
```

---

## 3事業ページの詳細設計

### PRAXIS（business/praxis/index.html）
```
タイトル: 「企業のAI・DX実装を、現場で伴走する。」
ターゲット: 中小企業・スタートアップのCEO/経営幹部

問題提起セクション:
「こんな悩みを抱えていませんか？」
- AIを導入したいが、何から始めればいいか分からない
- 補助金申請したいが、実装まで繋げられない
- 外部に頼んだが、現場に定着しなかった

サービス内容:
1. AI業務自動化（採用・CS・資料作成等）
2. DX戦略設計・補助金活用支援
3. 実装伴走・研修・定着支援

実績の根拠（代表の経験から）:
- アンティル社: 生成AIで採用業務自動化
- Google AI Ambassador第1期として実装知識

料金体系（目安）:
- 無料相談（30分・オンライン）
- スポット相談: ¥30,000/回
- 月次伴走プラン: 応談

CTA: [まず30分、話してみる]（Googleカレンダー連携予約フォームへ）
```

### ACADEMIA（business/academia/index.html）
```
タイトル: 「次世代に、挑戦できる場所をつくる。」
ターゲット（双方向）:
- 学生: 不登校経験者・進路に悩む大学生
- 企業: インターン受け入れ・若手採用を考える企業

価値提案:
「Praxis案件に参加する学生アンバサダーは、
 教室では学べないAI実装の現場を経験します。
 企業は優秀な若手と出会い、
 学生は実績と報酬を得ます。」

参加の動線（2パターン）:
[学生として参加する] [学生を採用・受け入れる企業様へ]

代表の原体験との接続:
「12年間学校に行けなかった私が、
 20歳でGoogleに認められた理由は、
 "機会を自分で作り続けた"からです。
 この協会は、その方法論を全国に届けます。」
```

### ORATIO（business/oratio/index.html）
```
タイトル: 「代表の言葉が、ブランドの最前線になる。」
実績・媒体（箇条書き）:
- YouTube「挑戦を文化に」登壇
- TIESBRICK所属
- 講演テーマ: AI×教育/不登校×起業/次世代リーダーシップ

依頼カテゴリと料金目安:
- メディア取材・インタビュー: 応談
- 登壇・講演（60-90分）: 応談
- コラム・寄稿: 応談

CTA: [取材・登壇依頼フォームへ]
```

---

## データファイルの更新

### `_data/members.yml`（更新）
```yaml
- id: inoue-kanta
  name: 井上 幹太
  name_en: Kanta Inoue
  position: 機会建築家 / Opportunity Architect
  role: 代表取締役 CEO & Founder
  tagline: "あなたが主役の時代をつくる。"
  story_short: "12年間の不登校が、私を機会建築家にした。"
  bio: |
    12歳から12年間、不登校を経験。学校の外で経済・テクノロジー・デザインを独学し、
    14歳でWebライターとして独立。S高等学校では国際経済学オリンピックで世界3位を獲得。
    J-StarX Finland第1期としてAalto大学で起業家精神を学ぶ。
    学生団体FIN/School.（金融教育）・ESF（AI教育）を創業し、UNION CTO（学生700名連合）に就任。
    Google AI Ambassador第1期として認定後、20歳でRegalis Japan Groupを設立。
    「機会が届いていない場所に、機会を設計し直す」をミッションに掲げる機会建築家。
  photo: /images/_顔写真_ビジネス用黒服-背景白.png
  photo_hero: /images/kanta_kyoto-suits.jpg
  photo_formal: /images/【顔写真】井上幹太_スイス国連.jpg
  achievements:
    - "国際経済学オリンピック 世界3位"
    - "J-StarX Finland 第1期採択"
    - "Google AI Ambassador 第1期"
    - "Regalis Japan Group 代表取締役（20歳で設立）"
  sns:
    x: https://twitter.com/
    instagram: https://instagram.com/
```

### `_data/businesses.yml`（3事業前景＋5事業後景に再構成）
前景3事業をfeatured: trueでマーク、後景5事業をfeatured: falseに設定。

---

## ナビゲーションの更新（_includes/corp-header.html）

```html
<!-- 日本語ナビゲーション -->
<ul class="corp-nav">
  <li><a href="{{ page.corpbase | default: '/group' }}/">ホーム</a></li>
  <li><a href="{{ page.corpbase | default: '/group' }}/about/ceo.html">代表について</a></li>
  <li><a href="{{ page.corpbase | default: '/group' }}/business/">3つの事業</a></li>
  <li><a href="{{ page.corpbase | default: '/group' }}/about/company.html">会社概要</a></li>
  <li><a href="https://regalis-order-suits.com/" class="corp-header__back">スーツブランド ↗</a></li>
  <li><a href="{{ page.corpbase | default: '/group' }}/contact/" class="corp-nav__cta">無料相談</a></li>
</ul>
```

---

## SEO・オーガニックリード獲得の設計

### キーワード戦略（ページ別）

| ページ | 主キーワード | サブキーワード |
|---|---|---|
| トップ | 井上幹太 / 機会建築家 | Regalis Japan Group |
| 代表紹介 | 井上幹太 プロフィール | 不登校 起業 / Google AI Ambassador |
| PRAXIS | AI DXコンサルティング 中小企業 | 補助金 業務自動化 東京 |
| ACADEMIA | 学生アンバサダー協会 / 不登校 起業 | インターン AI実装 |
| ORATIO | 井上幹太 講演依頼 / 取材 | 起業家 AI教育 |

### 構造化データ（JSON-LD）
- トップページ: `Organization` + `Person`（代表）
- 代表紹介ページ: `Person` + `ProfilePage`
- 事業ページ: `Service`
- お問い合わせ: `ContactPage`

### 動線設計（Organic → Lead）
```
Google検索「井上幹太」→ 代表紹介ページ → 相談CTA
Google検索「AI DXコンサル 中小企業」→ PRASISページ → 無料相談フォーム
Google検索「不登校 起業」→ トップページ/代表紹介 → ACADEMIA参加フォーム
メディア掲載 → トップページ → 3事業カード → 各問い合わせ
```

### お問い合わせフォーム（contact/index.html）
目的別に3つのフォームを用意:
1. **AI・DX相談フォーム**（PRAXIS向け）: 企業名・業種・相談内容
2. **アンバサダー参加フォーム**（ACADEMIA向け）: 学生/企業・参加目的
3. **取材・登壇依頼フォーム**（ORATIO向け）: 媒体名・テーマ・希望日時

---

## CSS設計の方針（assets/css/corp.css 追記・修正）

### 新規コンポーネント
```css
/* タイムラインコンポーネント */
.opportunity-timeline { ... }
.opportunity-timeline__item { ... }
.opportunity-timeline__year { font: var(--ff-mono); color: var(--gold); }
.opportunity-timeline__text { ... }

/* Opportunity Loopの循環図 */
.opportunity-loop { display: flex; position: relative; }
.opportunity-loop__arrow { ... }

/* 3事業カード（前景） */
.praxis-card { border-top: 3px solid #2F7D4B; }
.academia-card { border-top: 3px solid #C75A1A; }
.oratio-card { border-top: 3px solid #C9A24B; }

/* 後景事業（小さいカード） */
.background-ventures { display: flex; gap: 12px; flex-wrap: wrap; opacity: 0.7; }
.background-venture-chip { padding: 8px 16px; border: 1px solid var(--line-dark); font-size: 12px; }

/* 相談カテゴリカード */
.consult-card { ... }
.consult-card--corporate { border-color: #2F7D4B; }
.consult-card--student { border-color: #C75A1A; }
.consult-card--media { border-color: #C9A24B; }
```

---

## 実装手順

### Phase 1（優先）: コアページ
1. `_data/members.yml` — CEOデータ更新
2. `_data/businesses.yml` — featured フラグ追加
3. `_includes/corp-header.html` — 日本語ナビ
4. `index.html` — 全面刷新
5. `about/ceo.html` — 新設（代表紹介）

### Phase 2: 事業ページ
6. `business/praxis/index.html` — 新設
7. `business/academia/index.html` — 新設
8. `business/oratio/index.html` — 新設
9. `business/index.html` — 前景3＋後景5の新レイアウト

### Phase 3: 動線強化
10. `contact/index.html` — 3目的別フォーム
11. `assets/css/corp.css` — 新コンポーネント追加
12. `_layouts/corp.html` — JSON-LD更新

### Phase 4: 旧ページ整理
13. `about/members.html` → `about/ceo.html`へのリダイレクト設定
14. `business/talent/` `business/dx-consulting/` 等の旧ページを後景事業ページに統合

---

## 注意事項
- baseurl は `/group` のため、全リンクは `{{ page.corpbase | default: '/group' }}/path` 形式
  または `_config.yml` の defaults で `corpbase: /group` をすべての group/ ページに設定済み
- 画像は `/images/` ディレクトリにある実在のもののみ使用
  - `/images/_顔写真_ビジネス用黒服-背景白.png`（メイン）
  - `/images/kanta_kyoto-suits.jpg`（スーツ姿）
  - `/images/【顔写真】井上幹太_スイス国連.jpg`（フォーマル）
  - `/images/rogo.new_transpalent-Photoroom.webp`（ロゴ）
  - `/images/Student.both.webp`（学生画像）
- フォントは既存のCormorant Garamond（英語見出し）＋ Noto Serif JP（日本語）を継続使用
- ダークテーマ（`--void: #080B12`）を維持
