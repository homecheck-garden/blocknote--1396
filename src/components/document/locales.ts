export const stringDictionary = {
    slash_menu: {
        heading: {
            title: "제목",
            subtext: "제목을 추가하세요",
            aliases: ["heading", "제목"],
            group: "기본",
        },
        heading_2: {
            title: "제목2",
            subtext: "제목2을 추가하세요",
            aliases: ["heading2", "제목2"],
            group: "기본",
        },
        heading_3: {
            title: "제목3",
            subtext: "제목3을 추가하세요",
            aliases: ["heading3", "제목3"],
            group: "기본",
        },
        numbered_list: {
            title: "번호 목록",
            subtext: "번호 목록을 추가하세요",
            aliases: ["numbered_list", "번호 목록"],
            group: "기본",
        },
        bullet_list: {
            title: "글머리 기호 목록",
            subtext: "글머리 기호 목록을 추가하세요",
            aliases: ["bullet_list", "글머리 기호 목록"],
            group: "기본",
        },
        check_list: {
            title: "체크 박스",
            subtext: "체크 목록을 추가하세요",
            aliases: ["check_list", "체크 목록"],
            group: "기본",
        },
        paragraph: {
            title: "문단",
            subtext: "문단을 추가하세요",
            aliases: ["paragraph", "단락"],
            group: "기본",
        },
        code_block: {
            title: "코드",
            subtext: "코드을 추가하세요",
            aliases: ["code_block", "코드 블록"],
            group: "기본",
        },
        table: {
            title: "표",
            subtext: "표를 추가하세요",
            aliases: ["table", "표"],
            group: "기본",
        },
        image: {
            title: "이미지",
            subtext: "이미지를 추가하세요",
            aliases: ["image", "이미지"],
            group: "기본",
        },
        video: {
            title: "비디오",
            subtext: "비디오를 추가하세요",
            aliases: ["video", "비디오"],
            group: "기본",
        },
        audio: {
            title: "오디오",
            subtext: "오디오를 추가하세요",
            aliases: ["audio", "오디오"],
            group: "기본",
        },
        file: {
            title: "파일",
            subtext: "파일을 추가하세요",
            aliases: ["file", "파일"],
            group: "기본",
        },
        emoji: {
            title: "이모지",
            subtext: "이모지를 추가하세요",
            aliases: ["emoji", "이모지"],
            group: "기본",
        },
    },
    placeholders: {
        default: "여기에 텍스트를 입력하거나 '/'를 입력해 명령을 실행하세요",
        heading: "제목을 입력해주세요",
        bulletListItem: "리스트 항목 입력",
        numberedListItem: "번호 목록 항목 입력하세요",
        checkListItem: "체크 박스 항목 입력",
    },
    file_blocks: {
        image: {
            add_button_text: "이미지 추가",
        },
        video: {
            add_button_text: "비디오 추가",
        },
        audio: {
            add_button_text: "오디오 추가",
        },
        file: {
            add_button_text: "파일 추가",
        },
    },
    side_menu: {
        add_block_label: "블록 추가",
        drag_handle_label: "블록 드래그",
    },
    drag_handle: {
        delete_menuitem: "삭제",
        colors_menuitem: "색상",
    },
    table_handle: {
        delete_column_menuitem: "열 삭제",
        delete_row_menuitem: "행 삭제",
        add_left_menuitem: "왼쪽에 열 추가",
        add_right_menuitem: "오른쪽에 열 추가",
        add_above_menuitem: "위에 행 추가",
        add_below_menuitem: "아래에 행 추가",
    },
    suggestion_menu: {
        no_items_title: "항목 없음",
        loading: "로딩 중...",
    },
    color_picker: {
        text_title: "텍스트 색상",
        background_title: "배경색",
        colors: {
            default: "기본",
            gray: "회색",
            brown: "갈색",
            red: "빨간색",
            orange: "주황색",
            yellow: "노란색",
            green: "초록색",
            blue: "파란색",
            purple: "보라색",
            pink: "분홍색",
        },
    },
    formatting_toolbar: {
        bold: {
            tooltip: "굵게",
            secondary_tooltip: "굵게",
        },
        italic: {
            tooltip: "기울임",
            secondary_tooltip: "기울임",
        },
        underline: {
            tooltip: "밑줄",
            secondary_tooltip: "밑줄",
        },
        strike: {
            tooltip: "취소선",
            secondary_tooltip: "취소선",
        },
        code: {
            tooltip: "코드",
            secondary_tooltip: "코드",
        },
        colors: {
            tooltip: "색상",
        },
        link: {
            tooltip: "링크",
            secondary_tooltip: "링크",
        },
        file_caption: {
            tooltip: "파일 설명",
            input_placeholder: "설명을 입력하세요",
        },
        file_replace: {
            tooltip: {
                image: "이미지 변경",
                video: "비디오 변경",
                audio: "오디오 변경",
                file: "파일 변경"
            },
        },
        file_rename: {
            tooltip: {
                image: "이미지 이름 변경",
                video: "비디오 이름 변경",
                audio: "오디오 이름 변경",
                file: "파일 이름 변경"
            },
            input_placeholder: {
                image: "이미지 이름 변경",
                video: "비디오 이름 변경",
                audio: "오디오 이름 변경",
                file: "파일 이름 변경"
            }
        },
        file_download: {
            tooltip: {
                image: "이미지 다운로드",
                video: "비디오 다운로드",
                audio: "오디오 다운로드",
                file: "파일 다운로드"
            }, 
        },
        file_delete: {
            tooltip: {
                image: "이미지 삭제",
                video: "비디오 삭제",
                audio: "오디오 삭제",
                file: "파일 삭제"
            }, 
        },
        file_preview_toggle: {
            tooltip: "미리보기 토글",
        },
        nest: {
            tooltip: "중첩",
            secondary_tooltip: "중첩",
        },
        unnest: {
            tooltip: "중첩 해제",
            secondary_tooltip: "중첩 해제",
        },
        align_left: {
            tooltip: "왼쪽 정렬",
        },
        align_center: {
            tooltip: "가운데 정렬",
        },
        align_right: {
            tooltip: "오른쪽 정렬",
        },
        align_justify: {
            tooltip: "양쪽 정렬",
        },
    },
    file_panel: {
        upload: {
            title: "파일 업로드",
            file_placeholder: {
                image: "이미지 업로드",
                video: "비디오 업로드",
                audio: "오디오 업로드",
                file: "파일 업로드"
            }, 
            upload_error: "업로드 중 오류 발생",
        },
        embed: {
            title: "파일 삽입",
            embed_button: {
                image: "이미지 삽입",
                video: "비디오 삽입",
                audio: "오디오 삽입",
                file: "파일 삽입"
            }, 
            url_placeholder: "URL을 입력하세요",
        },
    },
    link_toolbar: {
        delete: {
            tooltip: "링크 삭제",
        },
        edit: {
            text: "링크 편집",
            tooltip: "링크 편집",
        },
        open: {
            tooltip: "링크 열기",
        },
        form: {
            title_placeholder: "제목을 입력하세요",
            url_placeholder: "URL을 입력하세요",
        },
    },
    generic: {
        ctrl_shortcut: "Ctrl",
    },
} 