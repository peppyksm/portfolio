"""Create the website-aligned portfolio PDF and update its download asset.

The original PDF under docs/pdf and original team documents remain untouched.
Requires reportlab, pypdf and Pillow. Default fonts match the website's Windows
fallback (Malgun Gothic) and its editorial headings (Georgia).
"""
from argparse import ArgumentParser
from pathlib import Path
from shutil import copyfile
import json
from PIL import Image
from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT/'public/assets'
W, H, M, PAGES = 960, 540, 48, 15
INK, MUTED, LINE, SOFT, DARK, WHITE = '#171717', '#707070', '#dededb', '#f5f5f3', '#1c1c1c', '#ffffff'
PROVIT = 'https://github.com/peppyksm/provit'
FRADE = 'https://github.com/chlqjarb0216-bit/frade'
PROFILE = 'https://github.com/peppyksm'
PR = 'https://github.com/wnsgk0509/provit/pull/53'
P_SHA = '5ea207c3eb8d85a074169e89c8efd9b333e27d09'
F_SHA = 'a1c49b94ac635e76c5ace60801383c57e584f64e'
REVIEW = f'{PROVIT}/blob/{P_SHA}/backend/src/main/java/com/provit/service/document/impl/DocumentReviewServiceImpl.java'
LENGTH = f'{PROVIT}/blob/{P_SHA}/docs/interview-text-length-review.md'
HISTORY = f'{FRADE}/blob/{F_SHA}/src/main/webapp/WEB-INF/mybatis/mapper/history/history_mapper.xml'
ASSET_CODE = f'{FRADE}/blob/{F_SHA}/src/main/java/com/frade/service/portfolio/impl/PortfolioServiceImpl.java'


class Portfolio:
    def __init__(self, path, font_dir):
        for name, filename in [('Body','malgun.ttf'), ('BodyBold','malgunbd.ttf'), ('Editorial','georgia.ttf')]:
            pdfmetrics.registerFont(TTFont(name, str(font_dir/filename)))
        pdfmetrics.registerFontFamily('Body', normal='Body', bold='BodyBold', italic='Body', boldItalic='BodyBold')
        self.c = canvas.Canvas(str(path), pagesize=(W,H), invariant=1, pageCompression=1)
        self.c.setTitle('김승민 | Java Backend Developer Portfolio')
        self.c.setAuthor('김승민')
        self.c.setSubject('웹 포트폴리오와 통일한 흑백 디자인 | Projects, About me, Skills, Contact')
        self.page, self.manifest = 0, []

    def rect(self, x, top, width, height, fill=WHITE, stroke=None, radius=0):
        c = self.c
        c.setFillColor(colors.HexColor(fill))
        c.setStrokeColor(colors.HexColor(stroke or fill))
        c.setLineWidth(.65)
        if radius:
            c.roundRect(x,H-top-height,width,height,radius,fill=1,stroke=bool(stroke))
        else:
            c.rect(x,H-top-height,width,height,fill=1,stroke=bool(stroke))

    def line(self, x1, top, x2, color=LINE, weight=.65):
        self.c.setStrokeColor(colors.HexColor(color))
        self.c.setLineWidth(weight)
        self.c.line(x1,H-top,x2,H-top)

    def text(self, value, x, top, size=11, font='Body', color=INK, align='left'):
        c = self.c
        c.setFillColor(colors.HexColor(color))
        c.setFont(font,size)
        method = {'left':c.drawString,'center':c.drawCentredString,'right':c.drawRightString}[align]
        method(x,H-top,value)

    def para(self, value, x, top, width, size=11.5, color='#555555', bold=False, leading=None, max_height=None):
        style = ParagraphStyle('body',fontName='BodyBold' if bold else 'Body',fontSize=size,
                               leading=leading or size*1.65,textColor=colors.HexColor(color),wordWrap='CJK',splitLongWords=False)
        p = Paragraph(value,style)
        _, height = p.wrap(width,H)
        if (max_height is not None and height>max_height+.01) or top+height>493:
            raise ValueError(f'Page {self.page}: paragraph out of bounds ({top}+{height}): {value}')
        p.drawOn(self.c,x,H-top-height)
        return top+height

    def label(self, value, x, top, color=MUTED):
        self.c.saveState()
        self.c.setFillColor(colors.HexColor(color))
        t = self.c.beginText(x,H-top)
        t.setFont('Body',8)
        t.setCharSpace(1.1)
        t.textOut(value)
        self.c.drawText(t)
        self.c.restoreState()

    def link(self, label, url, x, top, size=9.2, color=INK, internal=False):
        self.text(label,x,top,size,color=color)
        width = pdfmetrics.stringWidth(label,'Body',size)
        self.line(x,top+5,x+width,'#a5a5a5',.55)
        bounds = (x,H-top-8,x+width+3,H-top+size+2)
        if internal:
            self.c.linkRect('',url,bounds,relative=0,thickness=0)
        else:
            self.c.linkURL(url,bounds,relative=0)

    def button(self, label, x, top, width, destination):
        self.rect(x,top,width,35,INK)
        self.text(label,x+15,top+22,10,color=WHITE)
        self.text('>',x+width-16,top+22,10,color=WHITE)
        self.c.linkRect('',destination,(x,H-top-35,x+width,H-top),relative=0,thickness=0)

    def chips(self, values, x, top, max_width, size=8.6):
        left = x
        for value in values:
            width = pdfmetrics.stringWidth(value,'Body',size)+19
            if left+width>x+max_width:
                left,top = x,top+28
            self.rect(left,top,width,22,WHITE,LINE)
            self.text(value,left+9,top+14.8,size,color='#4b4b4b')
            left += width+6
        return top+22

    def block(self, label, body, x, top, width, size=11.3):
        self.text(label,x,top,13,'BodyBold')
        return self.para(body,x,top+13,width,size)+24

    def note(self, body, x, top, width, size=8.5):
        return self.para(body,x,top,width,size,MUTED,leading=size*1.55)

    def browser(self, filename, x, top, width, height, title):
        self.rect(x,top,width,height,SOFT,'#dce0e4',6)
        self.rect(x+.6,top+.6,width-1.2,24,'#edf2f8',radius=5)
        self.line(x,top+24,x+width,'#dce0e4')
        for i,color in enumerate(['#cf938c','#d5b579','#8cae9b']):
            self.c.setFillColor(colors.HexColor(color))
            self.c.circle(x+13+i*10,H-top-12,2.5,fill=1,stroke=0)
        self.text(title,x+width/2,top+15.5,7.1,color='#718097',align='center')
        image = Image.open(ASSETS/filename)
        aw,ah = width-10,height-31
        ratio = min(aw/image.width,ah/image.height)
        iw,ih = image.width*ratio,image.height*ratio
        self.c.drawImage(ImageReader(image),x+(width-iw)/2,H-top-27-(ah-ih)/2-ih,width=iw,height=ih,mask='auto')

    def begin(self, key, title, dark=False, background=None):
        if self.page:
            self.c.showPage()
        self.page += 1
        self.dark = dark
        self.manifest.append({'page':self.page,'key':key,'title':title})
        self.c.bookmarkPage(key)
        self.c.addOutlineEntry(title,key,level=0,closed=False)
        self.rect(0,0,W,H,background or (DARK if dark else WHITE))
        fg,muted,line = (WHITE,'#aaaaaa','#484848') if dark else (INK,MUTED,LINE)
        self.text('KSM',M,35,17,'BodyBold',fg)
        self.text('’s portfolio.',M+42,35,10,color=fg)
        for label,target,x in [('Projects','projects',653),('About me','about',726),('Skills','skills',813),('Contact','contact',868)]:
            self.text(label,x,33,8.3,color=muted)
            self.c.linkRect('',target,(x,H-39,x+pdfmetrics.stringWidth(label,'Body',8.3),H-23),relative=0,thickness=0)
        self.line(M,56,W-M,line)
        self.line(M,509,W-M,line)
        self.label('KIM SEUNGMIN / JAVA BACKEND DEVELOPER',M,526,muted)
        self.text(f'{self.page:02d} / {PAGES:02d}',W-M,526,8,color=muted,align='right')

    def heading(self, eyebrow, title, subtitle=None):
        fg,muted = (WHITE,'#aaaaaa') if self.dark else (INK,MUTED)
        self.label(eyebrow,M,89,muted)
        self.text(title,M,137,39,'Editorial',fg)
        if subtitle:
            self.para(subtitle,M,151,864,11,color=muted)

    def finish(self):
        if self.page!=PAGES:
            raise ValueError(f'Expected {PAGES} pages, got {self.page}')
        self.c.save()


def draw(p):
    # 01: Match the visual hierarchy of the website hero.
    p.begin('home','김승민 - Java Backend Developer',background=SOFT)
    p.label('JAVA BACKEND DEVELOPER',375,116)
    p.text('안녕하세요,',480,179,34,align='center')
    p.text('김승민입니다.',480,225,34,'BodyBold',align='center')
    p.line(465,252,495,'#666666')
    p.text('화면부터 서버, 데이터까지 연결하는',480,290,25,align='center')
    p.text('자바 백엔드 개발자입니다.',480,329,28,'BodyBold',align='center')
    p.text('사용자의 흐름을 이해하고, 예외 상황까지 살핍니다.',480,361,11.5,color=MUTED,align='center')
    p.button('프로젝트 보기',336,393,139,'projects')
    p.link('github.com/peppyksm',PROFILE,501,415,9.5)
    p.label('SELECTED WORK / 2026',M,483)
    p.link('peppyksm@gmail.com','mailto:peppyksm@gmail.com',763,483,9)

    # 02: PDF project cards function as links to each case study.
    p.begin('projects','Projects',dark=True)
    p.heading('01 / SELECTED WORK','Projects.','직접 맡아 구현한 기능과 설계 과정입니다.')
    cards = [
        (48,'03','provit','2026.09.14 - 2026.10.08 / 4인 팀','서류부터 면접까지 연결하는<br/>AI 취업 준비 플랫폼','팀장 · 취업문서 / AI 첨삭 / 모의면접','평가 생성 후 저장 실패 시,<br/>기존 평가를 보관해 저장만 재시도합니다.',['Java 17','Spring MVC','React 19','Oracle 19c']),
        (495,'02','frade','2026.08.20 - 2026.09.08 / 5인 팀','모의 투자와 의견 공유를 잇는<br/>주식 트레이딩 플랫폼','거래기록 · 자산 포트폴리오 / 결과 발표','최신순 정렬 후 25건 조회와 자산 계산을 통해<br/>거래 데이터를 사용자의 자산 정보로 연결합니다.',['Java 17','Spring MVC','JSP','Chart.js']),
    ]
    for x,no,name,period,title,role,case,tags in cards:
        p.rect(x,192,417,290,WHITE)
        p.label(f'PROJECT {no}',x+24,218)
        p.text(name+'.',x+24,257,32,'Editorial')
        p.text(period,x+24,281,9.2,color=MUTED)
        p.line(x+24,296,x+393)
        p.para(title,x+24,310,365,15,bold=True,leading=23)
        p.text(role,x+24,373,9,color=MUTED)
        p.note(case,x+24,389,360,9.5)
        p.chips(tags,x+24,445,365,7.8)
        p.c.linkRect('',name,(x,H-482,x+417,H-192),relative=0,thickness=0)

    # 03: Dark project section with a white card, just like the site.
    p.begin('provit','provit - AI 취업 준비 플랫폼',dark=True)
    p.rect(M,80,864,408,WHITE)
    p.label('3차 프로젝트 / PROJECT 03',70,104)
    p.text('provit.',70,146,38,'Editorial')
    p.text('2026.09.14 - 2026.10.08 / 4인 팀',70,170,9.5,color=MUTED)
    p.text('팀장 · 프로젝트 총괄 및 일정 관리',888,110,10,color=MUTED,align='right')
    p.line(70,184,890)
    p.browser('document-write.png',70,202,505,249,'provit / 취업문서 작성')
    p.para('서류부터 면접까지<br/>이어지는 취업 준비',605,202,275,21,bold=True,leading=30)
    p.para('취업문서를 작성하고 AI 첨삭으로 보완한 뒤, 자신의 서류를 바탕으로 면접을 연습하는 서비스입니다.',605,277,275,11.3)
    p.line(605,351,886)
    p.label('MY CONTRIBUTION',605,373)
    p.para('이력서·자소서 CRUD / PDF 등록·조회·삭제<br/>AI 통합 첨삭·기록 / 모의면접 진행·평가·저장',605,385,280,10.1)
    p.text('Java 17 / Spring MVC 5.3.39 / Tomcat 9',605,432,8.3,color=MUTED)
    p.text('React 19 / MyBatis / Oracle 19c / OpenAI API',605,447,8.3,color=MUTED)
    p.link('공개 소스',PROVIT,605,472,9)
    p.link('첨삭 기여 PR #53',PR,690,472,9)
    p.note('제공된 최종 화면 자료. 개인 데이터는 화면 구성 예시입니다.',70,460,505,8)

    # 04: Documents, validation and file/DB lifecycle.
    p.begin('documents','provit - Documents')
    p.heading('PROJECT 03 / DOCUMENTS','Documents.','복합 문서와 파일을 함께 다루되, 저장 책임과 실패 경계를 분명히 합니다.')
    p.browser('document-write.png',M,198,508,264,'provit / 취업문서 작성')
    y = p.block('복합 문서는 한 트랜잭션으로','이력서 본문과 학력·경력·자격증을 함께 저장합니다. 이력서·자소서는 CRUD, PDF는 등록·조회·삭제를 제공합니다.',592,211,316)
    y = p.block('소유권과 입력을 서버에서 검증','필수값·날짜·직무 코드와 문서 소유권을 확인합니다. PDF는 용량·확장자·시그니처를 검사하고 UUID 파일명으로 공개 경로 밖에 저장합니다.',592,y,316)
    p.block('DB 커밋과 파일 정리 시점 분리','롤백 시 새 파일을 정리하고, 기존 파일은 DB 커밋 후 삭제합니다. 삭제 실패는 로그로 남기며 별도 재처리는 없습니다.',592,y,316)
    p.note('화면: 최종 화면설계 자료 / 구현: DocumentServiceImpl, LocalPortfolioFileStorage',M,476,864)

    # 05: AI review response contract alongside its original screenshot.
    p.begin('review','provit - AI Review')
    p.heading('PROJECT 03 / AI REVIEW','AI Review.','여러 취업문서를 한 번에 검토하고, 수정 제안과 근거를 함께 전달합니다.')
    p.browser('document-review.png',M,198,508,264,'provit / AI 통합 첨삭 결과 예시')
    y = p.block('한 묶음으로 전달하는 문서','이력서·자기소개서와 선택 PDF, 첨삭 조건을 함께 전달합니다. 정상 처리의 생성 호출은 1회입니다.',592,211,316)
    y = p.block('구조와 근거를 함께 확인','JSON 구조·필수 필드·길이를 검증합니다. 텍스트 인용문은 실제 입력과 대조하고, PDF는 문서 종류와 페이지 범위를 검사합니다.',592,y,316)
    p.block('수정 제안에서 다음 준비까지','종합 의견, 강점·개선점, 수정 전후 비교, 서류 간 일관성 점검과 면접 준비 추천을 제공합니다.',592,y,316)
    p.note('화면 구성용 결과 예시입니다. 실제 선택 서류의 분석 결과나 성과 지표를 뜻하지 않습니다. 의미적 정확성은 별도 품질 확인이 필요합니다.',M,476,864)

    # 06: Short transactions and request identity, with the actual ERD.
    p.begin('requests','provit - Request & Storage')
    p.heading('PROJECT 03 / ARCHITECTURE','Request & Storage.','외부 AI 호출과 DB 트랜잭션을 분리하고, 같은 요청의 재전송을 구분합니다.')
    for x,no,title,body in [(48,'01','PROCESSING · 원문 저장','짧은 DB 트랜잭션'),(346,'02','AI 호출 · 응답 검증','DB 트랜잭션 밖에서 실행'),(644,'03','첨삭 결과 저장','별도 DB 트랜잭션')]:
        p.rect(x,193,268,77,SOFT)
        p.text(no,x+14,220,13,'Editorial','#999999')
        p.text(title,x+42,220,11.2,'BodyBold')
        p.text(body,x+42,246,9.2,color=MUTED)
    p.text('>',329,235,15,color=MUTED)
    p.text('>',627,235,15,color=MUTED)
    p.browser('review-erd.png',M,292,430,181,'provit / AI 첨삭 데이터 구조')
    y = p.block('requestId + 문서 ID·조건 해시','동일 사용자·requestId에서 문서 ID와 첨삭 조건의 SHA-256 해시가 같으면 기존 상태·결과를 반환합니다. 조건이 바뀌면 409이며, 새 requestId는 같은 문서도 새 요청입니다.',510,307,398,10.7)
    p.block('원문 보관과 기록 조회의 범위','당시 JSON·PDF는 DB에 보관합니다. 기록 API는 인용 구절·수정안·결과를 조회합니다. 전체 보관본 열람 API와 잔류 PROCESSING의 자동 복구는 구현하지 않았습니다.',510,y,398,10.7)
    p.link('첨삭 서비스 코드',REVIEW,M,489,8.5)

    # 07: Interview setup and its four normal generation stages.
    p.begin('interview','provit - AI Interview')
    p.heading('PROJECT 03 / AI INTERVIEW','AI Interview.','5문항의 면접을 진행하며, 정상 완료 흐름의 생성 호출을 4회로 구성했습니다.')
    p.browser('interview.png',M,198,452,259,'provit / AI 모의면접 설정')
    p.note('이력서·자소서·선택 포트폴리오와 난이도를 설정하는 화면입니다.',M,470,452)
    stages = [('01','면접 시작','1~3번 질문 일괄 생성'),('02','3번 답변 제출','4번 문제해결 질문 생성'),('03','4번 답변 제출','5번 꼬리질문 생성'),('04','5번 답변 제출','전체 질의·응답 기반 최종 평가')]
    for i,(no,title,body) in enumerate(stages):
        top = 199+i*57
        p.text(no,535,top+13,14,'Editorial','#999999')
        p.text(title,573,top+13,11.4,'BodyBold')
        p.text(body,573,top+34,10,color=MUTED)
        p.line(535,top+46,910)
    p.note('1·2번 답변에는 이미 생성한 다음 질문을 반환합니다. 선택 공고 요약과 사용자 서류를 반영하며, 최종 평가에 시작 시점의 서류·PDF를 다시 전달합니다.',535,438,375)

    # 08: Problem, inspection, reasoning, improvement and evidence.
    p.begin('reliability','provit - 상태 관리와 저장 재시도')
    p.heading('PROJECT 03 / PROBLEM SOLVING','Reliability.','저장에 실패해도, 이미 생성한 평가 결과를 잃지 않도록.')
    p.browser('interview-result.png',M,198,430,209,'provit / 면접 상세 기록')
    p.text('5가지 평가 항목 · 동일 가중 평균',M,430,11,'BodyBold')
    p.note('서류 일치성·전문성·문제해결능력·논리력·의사소통능력을 0~100점으로 받습니다. 서버가 범위를 검증하고 평균을 소수점 첫째 자리까지 반올림합니다.',M,442,430,8.4)
    p.note('테스트 화면. 점수는 모델의 학습 참고용이며 실제 채용 역량·기술 숙련도 지표가 아닙니다.',M,473,430,7.7)
    rows = [
        ('문제','최종 평가가 생성된 뒤 DB 저장에 실패하면, 전체 흐름 재실행으로 같은 평가를 다시 생성할 수 있습니다.'),
        ('확인·검토','AI 생성과 DB 저장은 다른 단계입니다. 일시 오류와 현재 코드의 영구 오류 분류(무결성 위반·ORA-12899)를 구분했습니다.'),
        ('개선','세션별 동기화로 처리하고, 일시 실패에는 평가·답변을 보관합니다. 같은 마지막 답변을 재제출하면 기존 평가로 저장만 재시도하며, 기록과 평가는 한 트랜잭션으로 저장합니다.'),
        ('검증','기존 대체 의존성 테스트 기록에서 평가 재사용과 영구 오류 후 반복 방어를 확인했습니다. 이번에 실 DB·AI를 재실행한 결과는 아닙니다.'),
    ]
    y = 201
    for title,body in rows:
        p.text(title,510,y+9,10,'BodyBold')
        end = p.para(body,590,y-2,320,10.5,leading=16)
        p.line(510,end+11,910)
        y = end+25
    p.note('서버 상태·브라우저 초안을 복원해도 타이머는 유지합니다. 메모리 세션은 재시작·인스턴스 변경 시 복구할 수 없습니다. KST 23:55 만료, 00:00까지 면접 차단.',510,457,400,8.3)

    # 09: Byte versus character semantics with complete type definitions.
    p.begin('length','provit - Oracle 한글 저장 길이')
    p.heading('PROJECT 03 / PROBLEM SOLVING','Text Length.','문자 수 제한을 지켜도 저장되지 않던 평가 문구, 길이 단위부터 확인했습니다.')
    for x,value,label in [(48,'500 BYTE','기존 평가 컬럼의 최대 길이'),(346,'750 BYTE','AL32UTF8 완성형 한글 250자'),(644,'250 CHAR','문자 수 기준의 변경 정의')]:
        p.rect(x,194,268,77,SOFT)
        p.text(value,x+18,231,25,'Editorial')
        p.text(label,x+18,255,8.5,color=MUTED)
    y = p.block('문제와 원인 확인','일반적인 완성형 한글은 AL32UTF8에서 글자당 3바이트입니다. 평가 250자는 750바이트여서 VARCHAR2(500 BYTE)를 초과했습니다. Java의 500자 허용도 AI의 250자 제한과 달랐습니다.',M,305,410,10.8)
    p.block('검토·개선·검증','AI·Java·DB의 길이 기준을 함께 맞추고 마이그레이션을 준비했습니다. 별도 Oracle 테스트 테이블에서 한글·혼합문자·경계값 저장을 검증했고, 기존 데이터가 새 제한을 넘으면 ALTER 전에 중단하도록 했습니다.',M,y,410,10.8)
    x = 503
    p.text('면접 필드의 변경 정의',x,305,12.5,'BodyBold')
    for i,(label,limit,definition) in enumerate([('질문','120자','VARCHAR2(120 CHAR)'),('답변','1,000자','VARCHAR2(1000 CHAR)'),('평가','250자','VARCHAR2(250 CHAR)')]):
        top = 323+i*32
        p.line(x,top,912)
        p.text(label,x,top+21,10.5)
        p.text(limit,x+70,top+21,10.5,color=MUTED)
        p.text(definition,x+160,top+21,10,'Courier')
    p.note('CHAR는 문자 길이 단위입니다. 고정 길이 CHAR 자료형이나 바이트 수와 구분합니다. 앱은 UTF-16 기준이므로 일부 이모지는 2로 계산합니다.',x,430,409)
    p.note('<b>적용 상태</b>  기존 프로젝트 DB에는 마이그레이션·서버 재배포가 필요합니다. 일반 이력서 mainDuty는 운영 DDL 미확인인 조건부 반례로 남아 있습니다.',M,469,715,8.1)
    p.link('길이 검증 근거',LENGTH,815,487,8.5)

    # 10: Consistent Frade project cover.
    p.begin('frade','frade - 주식 트레이딩 플랫폼',dark=True)
    p.rect(M,80,864,408,WHITE)
    p.label('2차 프로젝트 / PROJECT 02',70,104)
    p.text('frade.',70,146,38,'Editorial')
    p.text('2026.08.20 - 2026.09.08 / 5인 팀',70,170,9.5,color=MUTED)
    p.text('거래기록 · 자산 포트폴리오 / 결과 발표',888,110,10,color=MUTED,align='right')
    p.line(70,184,890)
    p.browser('frade-mypage.png',70,202,505,249,'frade / 마이페이지 · 자산 포트폴리오')
    p.para('거래 데이터를<br/>나의 자산 정보로',605,202,275,21,bold=True,leading=30)
    p.para('실제 시세를 바탕으로 모의 투자를 경험하고, 커뮤니티에서 투자 의견을 나누는 플랫폼입니다.',605,277,275,11.3)
    p.line(605,351,886)
    p.label('MY CONTRIBUTION',605,373)
    p.para('거래기록 저장·조회 DAO/SQL / 마이페이지 자산<br/>ERD 설계 참여·명세 작성 / 결과 발표',605,385,280,10.1)
    p.text('Java 17 / Spring MVC 5.3.37 / MyBatis',605,432,8.3,color=MUTED)
    p.text('Oracle / JSP / Chart.js',605,447,8.3,color=MUTED)
    p.link('공개 소스',FRADE,605,472,9)
    p.link('자산 계산 코드',ASSET_CODE,690,472,9)
    p.note('최종 화면 자료. 화면의 금액과 수익률은 테스트 데이터입니다.',70,460,505,8)

    # 11: SQL kept readable rather than scaled as a screenshot.
    p.begin('history','frade - 거래기록 조회')
    p.heading('PROJECT 02 / TRANSACTION HISTORY','Transaction History.','사용자별 체결 이력을 저장하고, 화면에 필요한 최신 거래를 정확한 순서로 가져옵니다.')
    p.rect(M,197,464,254,SOFT)
    p.label('history_mapper.xml',67,220)
    code = ['SELECT * FROM (','  SELECT s.stock_name, h.trade_price,','         h.trade_cnt, h.trade_date','  FROM t_history h','  JOIN t_stock s','    ON s.stock_code = h.stock_code','  WHERE h.user_num = #{userNum}','  ORDER BY h.trade_date DESC',') WHERE ROWNUM <= 25']
    for i,line in enumerate(code):
        p.text(line,69,249+i*20,10.4,'Courier','#424242')
    y = p.block('사용자별 조회와 종목명 JOIN','사용자 번호로 조회 범위를 제한하고 T_STOCK과 JOIN해 종목명을 함께 전달합니다. 거래일시 내림차순 정렬 뒤 ROWNUM을 적용합니다.',552,211,356)
    y = p.block('전체·기간별 조회는 DAO/SQL로','오늘은 00:00부터 다음 날 00:00 미만, 최근 일주일은 6일 전부터, 최근 한 달은 한 달 전부터 조회합니다.',552,y,356)
    p.block('마이페이지는 최근 25건','현재 마이페이지는 최근 거래 25건 조회를 사용합니다. 기간별 SQL 구현과 사용자 화면 필터 완료는 구분하며, 최근 건수를 전체 누적 거래 횟수로 표현하지 않습니다.',552,y,356)
    p.link('담당 거래 조회 SQL',HISTORY,M,480,9)
    p.note('구현: HistoryDAO / HistoryDAOImpl / history_mapper.xml',552,472,356)

    # 12: Asset calculations and live update scope.
    p.begin('assets','frade - 자산 계산과 시세 갱신')
    p.heading('PROJECT 02 / ASSETS & LIVE UPDATES','Asset Portfolio.','조회·계산·표시의 역할을 나누고, 표와 차트가 같은 자산 기준으로 움직이게 합니다.')
    p.text('계산 기준',M,210,13,'BodyBold')
    formulas = [('평균 매수가','매입원가 ÷ 보유수량'),('평가금액','현재가 × 보유수량'),('종목 손익','평가금액 - 매입원가'),('종목 수익률','손익 ÷ 매입원가 × 100'),('총자산','평가금액 합계 + 예치금'),('종목 비중','종목 평가금액 ÷ 총자산 × 100')]
    for i,(name,rule) in enumerate(formulas):
        top = 228+i*30
        p.line(M,top,465)
        p.text(name,M,top+20,10.6)
        p.text(rule,M+116,top+20,10.3,color='#555555')
    p.note('보유수량 0 초과만 조회 / 분모 0은 비율 0 / 비율은 소수 둘째 자리 반올림. 평균 단가는 정수 나눗셈이며 예치금이 없으면 0원으로 처리합니다.',M,424,417,9)
    y = p.block('화면에 맞춘 조회 모델','PortfolioInfoDTO에 종목별 계산값을 담고, AssetsInfoDTO와 MyPagePortfolioDTO로 자산 요약·최근 거래·Chart.js 차트 데이터를 전달합니다.',503,210,405,10.8)
    y = p.block('chart-tick으로 평가값 갱신','유효한 양수 가격만 반영해 평가금액·손익·수익률·비중을 다시 계산합니다. 중복 구독을 막고 pagehide에서 닫은 연결은 pageshow에서 다시 구독합니다.',503,y,405,10.8)
    p.block('현재 범위와 협업에서 배운 점','초기 투자금은 1,000만 원으로 고정됩니다. 시세만 갱신하며 수량·예치금은 재조회가 필요합니다. 팀의 시세 수집 기능과 연결하며 공통 데이터 형식·계산 기준, 반영 전 최신 브랜치 확인의 중요성을 배웠습니다.',503,y,405,10.8)
    p.link('자산 계산 코드',ASSET_CODE,M,487,8.5)

    # 13: About principles, matching the website copy.
    p.begin('about','About me')
    p.heading('02 / INTRODUCTION','About me.')
    p.para('잘 동작하는 순간부터<br/>실패한 다음까지 생각합니다.',M,195,420,23,bold=True,leading=34)
    p.para('사용자가 어떤 흐름으로 서비스를 이용하는지 먼저 이해하려고 합니다. 화면의 입력이 서버와 데이터에 어떻게 이어지는지 살피고, 각 단계의 책임과 기준을 분명히 하는 것을 중요하게 생각합니다.',M,290,415,11.5)
    p.para('오류를 만나면 현재 상태와 원인을 확인하고, 같은 문제가 반복되지 않을 방법을 고민합니다. 정상 동작뿐 아니라 중복 요청, 저장 실패, 다시 시도하는 순간까지 개발의 일부로 봅니다.',M,380,415,11.5)
    for i,(label,value) in enumerate([('이름','김승민 / Kim Seungmin'),('지원 직무','자바 백엔드 개발자'),('이메일','peppyksm@gmail.com'),('GitHub','github.com/peppyksm')]):
        top = 200+i*43
        p.text(label,520,top,9,color=MUTED)
        p.text(value,603,top,11)
        p.line(520,top+16,912)
    p.label('WORKING TOGETHER',520,387)
    p.text('같은 맥락을 공유하는 협업',520,414,15,'BodyBold')
    p.para('진행 상황과 문제를 공유하고, 변경 이유와 확인할 내용을 기록합니다. 팀장으로서 서로의 작업이 연결되는 지점을 미리 맞추려 합니다.',520,433,392,10.7)

    # 14: Exact skill labels, without project-specific versions.
    p.begin('skills','Skills',background=SOFT)
    p.heading('03 / TOOLKIT','Skills.','백엔드를 중심으로 화면 구현과 협업까지 연결하는 기술입니다.')
    skills = [
        ('Backend',['Java','Spring Framework','Tomcat'],'REST API와 서비스 로직을 구현하고, 입력 검증과 트랜잭션 경계를 관리합니다.'),
        ('Frontend',['HTML','CSS','JavaScript','React','JSP'],'사용자 입력부터 API 연동과 결과 표시까지, 화면과 서버의 흐름을 연결합니다.'),
        ('Database',['Oracle','MyBatis','SQL'],'JOIN 조회와 복합 데이터 저장, 원문 보관과 문자열 길이 기준을 다룹니다.'),
        ('AI Integration',['OpenAI API','JSON Schema'],'서류 기반 생성 흐름, 응답 검증, 재전송과 저장 실패 처리를 구성합니다.'),
        ('Collaboration',['Git','GitHub','Notion'],'코드와 작업 상황을 공유하고, 요구사항과 결정 내용을 기록합니다.'),
        ('Build Tools',['Maven'],'의존성과 빌드 설정을 관리하고, 실행·검증 가능한 환경을 구성합니다.'),
    ]
    for i,(title,tags,body) in enumerate(skills):
        x,top = M+(i%3)*300,202+(i//3)*143
        p.line(x,top,x+264,'#a5a5a5')
        p.text(f'{i+1:02d}',x,top+22,10,'Editorial','#999999')
        p.text(title,x+32,top+22,14,'BodyBold')
        end = p.chips(tags,x,top+39,264,8.2)
        p.para(body,x,max(top+75,end+12),264,10,leading=16)

    # 15: Website contact language and preserved future directions.
    p.begin('contact','Contact')
    p.heading('05 / GET IN TOUCH','Contact.')
    p.para('좋은 서비스를,<br/>함께 만듭니다.',M,202,440,32,bold=True,leading=47)
    p.para('자바 백엔드 개발자 김승민<br/>프로젝트와 개발에 관한 이야기를 나눠요.',M,326,408,12,color=MUTED)
    p.label('EMAIL',528,221)
    p.link('peppyksm@gmail.com','mailto:peppyksm@gmail.com',528,261,23)
    p.label('GITHUB',528,315)
    p.link('github.com/peppyksm',PROFILE,528,344,15)
    p.link('Provit 소스',PROVIT,528,390,9.5)
    p.link('첨삭 기여 PR #53',PR,643,390,9.5)
    p.link('Frade 소스',FRADE,802,390,9.5)
    p.line(M,428,912)
    p.label('NEXT STEPS',M,451)
    p.note('면접 세션의 공용 저장소 전환 / 실제 서류 기반 질문·첨삭 품질 평가 / 호출 지연·실패율 측정',M,465,864,9.5)
    p.finish()


def validate(path):
    reader = PdfReader(path)
    text = '\n'.join(page.extract_text() or '' for page in reader.pages)
    for term in ['김승민','Spring Framework','GitHub','Notion','VARCHAR2(120 CHAR)','VARCHAR2(1000 CHAR)',
                 'VARCHAR2(250 CHAR)','750 BYTE','마이그레이션','5인 팀','4인 팀','최신','23:55','기존 대체 의존성 테스트']:
        if term not in text:
            raise ValueError(f'Missing expected content: {term}')
    if len(reader.pages)!=PAGES:
        raise ValueError('Unexpected page count')
    links = [str(a.get_object()['/A']['/URI']) for pg in reader.pages for a in pg.get('/Annots',[])
             if '/A' in a.get_object() and '/URI' in a.get_object()['/A']]
    for url in [PROVIT,FRADE,PROFILE,PR,REVIEW,LENGTH,HISTORY,ASSET_CODE,'mailto:peppyksm@gmail.com']:
        if url not in links:
            raise ValueError(f'Missing expected URI: {url}')
    return {'pages':len(reader.pages),'uri_annotations':len(links),'unique_uris':len(set(links)),
            'size_bytes':path.stat().st_size,'page_size':[W,H]}


def main():
    parser = ArgumentParser()
    parser.add_argument('--output',type=Path,default=ROOT/'output/pdf/kim-seungmin-portfolio.pdf')
    parser.add_argument('--font-dir',type=Path,default=Path('C:/Windows/Fonts'))
    parser.add_argument('--no-sync-web',action='store_true',help='Do not update the website download asset')
    args = parser.parse_args()
    args.output.parent.mkdir(parents=True,exist_ok=True)
    portfolio = Portfolio(args.output,args.font_dir)
    draw(portfolio)
    report = validate(args.output)
    if not args.no_sync_web:
        destination = ASSETS/'kim-seungmin-portfolio.pdf'
        if destination.resolve()!=args.output.resolve():
            copyfile(args.output,destination)
    report['sections'] = portfolio.manifest
    args.output.with_suffix('.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(report,ensure_ascii=True,indent=2))


if __name__=='__main__':
    main()
