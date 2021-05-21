--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE ROLE tpl2_2021h1;
--
-- Name: journal; Type: TABLE; Schema: public; Owner: tpl2_2021h1
--

CREATE TABLE public.journal (
    id integer NOT NULL,
    entry text,
    date date,
    user_id integer NOT NULL
);


ALTER TABLE public.journal OWNER TO tpl2_2021h1;

--
-- Name: journal_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl2_2021h1
--

CREATE SEQUENCE public.journal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.journal_id_seq OWNER TO tpl2_2021h1;

--
-- Name: journal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl2_2021h1
--

ALTER SEQUENCE public.journal_id_seq OWNED BY public.journal.id;


--
-- Name: journal_user_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl2_2021h1
--

CREATE SEQUENCE public.journal_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.journal_user_id_seq OWNER TO tpl2_2021h1;

--
-- Name: journal_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl2_2021h1
--

ALTER SEQUENCE public.journal_user_id_seq OWNED BY public.journal.user_id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: tpl2_2021h1
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    task character varying,
    date date,
    user_id integer NOT NULL
);


ALTER TABLE public.tasks OWNER TO tpl2_2021h1;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl2_2021h1
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO tpl2_2021h1;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl2_2021h1
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: tasks_user_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl2_2021h1
--

CREATE SEQUENCE public.tasks_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_user_id_seq OWNER TO tpl2_2021h1;

--
-- Name: tasks_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl2_2021h1
--

ALTER SEQUENCE public.tasks_user_id_seq OWNED BY public.tasks.user_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: tpl2_2021h1
--

CREATE TABLE public.users (
    id integer NOT NULL,
    account character varying UNIQUE,
    date_joined date
);


ALTER TABLE public.users OWNER TO tpl2_2021h1;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl2_2021h1
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO tpl2_2021h1;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl2_2021h1
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: journal id; Type: DEFAULT; Schema: public; Owner: tpl2_2021h1
--

ALTER TABLE ONLY public.journal ALTER COLUMN id SET DEFAULT nextval('public.journal_id_seq'::regclass);


--
-- Name: journal user_id; Type: DEFAULT; Schema: public; Owner: tpl2_2021h1
--

ALTER TABLE ONLY public.journal ALTER COLUMN user_id SET DEFAULT nextval('public.journal_user_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: tpl2_2021h1
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: tasks user_id; Type: DEFAULT; Schema: public; Owner: tpl2_2021h1
--

ALTER TABLE ONLY public.tasks ALTER COLUMN user_id SET DEFAULT nextval('public.tasks_user_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: tpl2_2021h1
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: journal; Type: TABLE DATA; Schema: public; Owner: tpl2_2021h1
--

COPY public.journal (id, entry, date, user_id) FROM stdin;
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: tpl2_2021h1
--

COPY public.tasks (id, task, date, user_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tpl2_2021h1
--

COPY public.users (id, account, date_joined) FROM stdin;
\.


--
-- Name: journal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl2_2021h1
--

SELECT pg_catalog.setval('public.journal_id_seq', 1, false);


--
-- Name: journal_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl2_2021h1
--

SELECT pg_catalog.setval('public.journal_user_id_seq', 1, false);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl2_2021h1
--

SELECT pg_catalog.setval('public.tasks_id_seq', 1, false);


--
-- Name: tasks_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl2_2021h1
--

SELECT pg_catalog.setval('public.tasks_user_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl2_2021h1
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: journal journal_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl2_2021h1
--

ALTER TABLE ONLY public.journal
    ADD CONSTRAINT journal_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl2_2021h1
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl2_2021h1
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: tasks fk_user; Type: FK CONSTRAINT; Schema: public; Owner: tpl2_2021h1
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: journal fk_user; Type: FK CONSTRAINT; Schema: public; Owner: tpl2_2021h1
--

ALTER TABLE ONLY public.journal
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

