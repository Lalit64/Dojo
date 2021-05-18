const { app, BrowserWindow, shell } = require("electron")
const url = require("url");

const isMac = process.platform === "darwin";
const template = [
    ...(isMac
        ? [
            {
                label: app.name,
                submenu: [
                    {
                        label: `About ${app.name}`,
                        click: () => {
                            let aboutWindow = new BrowserWindow({
                                width: 700,
                                height: 500,
                                resizable: false,
                            });
                            // Load html into window
                            aboutWindow.loadURL(
                                url.format({
                                    pathname: `${__dirname}/app/aboutWindow.html`,
                                    protocol: "file:",
                                    slashes: true,
                                })
                            ) .then();

                        },
                    },
                    { type: "separator" },
                    { type: "separator" },
                    { role: "hide" },
                    { role: "quit" },
                ],
            },
        ]
        : []),
    {
        label: "File",
        submenu: [
            {
                label: "Preferences",
                accelerator:
                    process.platform === "darwin"
                        ? "CommandOrControl+,"
                        : "CommandOrControl+,",
                click: () => {
                    mainWindow
                        .loadURL("https://dojo.galileoxp.com/settings/profile")
                        .then();
                },
            },
            {
                label: "New",
                submenu: [
                    {
                        label: "Post",
                        submenu: [
                            {
                                label: "Student Announcements",
                                click: () => {
                                    mainWindow
                                        .loadURL(
                                            "https://dojo.galileoxp.com/c/student-announcements/new"
                                        )
                                        .then();
                                },
                            },
                            {
                                label: "Students Lobby",
                                click: () => {
                                    mainWindow
                                        .loadURL(
                                            "https://dojo.galileoxp.com/c/school-students-lobby/new"
                                        )
                                        .then();
                                },
                            },
                        ],
                    },
                    { type: "separator" },
                    {
                        label: "Direct Message",
                        click: () => {
                            mainWindow
                                .loadURL("https://dojo.galileoxp.com/messages/new")
                                .then();
                        },
                    },
                ],
            },
            {
                label: "Links",
                submenu: [
                    {
                        label: "Activities Calender",
                        click: () => {
                            shell
                                .openExternal(
                                    "https://calendar.google.com/calendar/embed?src=galileoxp.com_bnjd4q7mpv62h50teh1siql8b4%40group.calendar.google.com"
                                )
                                .then();
                        },
                    },
                    { type: "separator" },
                    {
                        label: "Trello Resource Board",
                        click: () => {
                            shell
                                .openExternal(
                                    "https://trello.com/b/8Bi2Dtcp/galileo-online-learning-resources"
                                )
                                .then();
                        },
                    },
                ],
            },
            { type: "separator" },
            isMac ? { role: "close" } : { role: "quit" },
        ],
    },
    {
        label: "Edit",
        submenu: [
            { role: "undo" },
            { role: "redo" },
            { type: "separator" },
            { role: "cut" },
            { role: "copy" },
            { role: "paste" },
            ...(isMac
                ? [
                    { role: "pasteAndMatchStyle" },
                    { role: "delete" },
                    { role: "selectAll" },
                    { type: "separator" },
                ]
                : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
        ],
    },
    {
        label: "View",
        submenu: [
            { role: "reload" },
            { type: "separator" },
            { role: "resetZoom" },
            { role: "zoomIn" },
            { role: "zoomOut" },
            { type: "separator" },
            { role: "togglefullscreen" },
        ],
    },

    {
        label: "Window",
        submenu: [
            { role: "minimize" },
            { role: "zoom" },
            ...(isMac
                ? [
                    { type: "separator" },
                    { role: "front" },
                    { type: "separator" },
                    { role: "window" },
                ]
                : [{ role: "close" }]),
        ],
    },
    {
        role: "help",
        submenu: [
            {
                label: "Go to Website",
                click: async () => {
                    await shell.openExternal("https://dojo.galileoxp.com");
                },
            },
            {
                label: "Galileo Website",
                click: async () => {
                    await shell.openExternal("https://galileoxp.com");
                },
            },
        ],
    },
]

module.exports = template