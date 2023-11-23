--
-- PostgreSQL database dump
--

-- Dumped from database version 13.6
-- Dumped by pg_dump version 13.6

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

--
-- Name: Todos; Type: TABLE; Schema: public; Owner: pokopitel
--

CREATE TABLE public."Todos" (
    id integer NOT NULL,
    title character varying(255),
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."Todos" OWNER TO pokopitel;

--
-- Name: Todos_id_seq; Type: SEQUENCE; Schema: public; Owner: pokopitel
--

CREATE SEQUENCE public."Todos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Todos_id_seq" OWNER TO pokopitel;

--
-- Name: Todos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pokopitel
--

ALTER SEQUENCE public."Todos_id_seq" OWNED BY public."Todos".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: pokopitel
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    name character varying(255),
    status character varying(255),
    login character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public."User" OWNER TO pokopitel;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: pokopitel
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO pokopitel;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pokopitel
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: pokopitel
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO pokopitel;

--
-- Name: Todos id; Type: DEFAULT; Schema: public; Owner: pokopitel
--

ALTER TABLE ONLY public."Todos" ALTER COLUMN id SET DEFAULT nextval('public."Todos_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: pokopitel
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Todos; Type: TABLE DATA; Schema: public; Owner: pokopitel
--

COPY public."Todos" (id, title, "createdAt", "userId") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: pokopitel
--

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: pokopitel
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
03187001-2d08-451d-88b7-58e97cd8016e	fb7a6e0371d3b2dc014cc1d356e378033ddf8eab36f6edabb2612bd0d1336ef1	2022-06-25 14:43:02.581287+03	20220625114302_	\N	\N	2022-06-25 14:43:02.567289+03	1
\.


--
-- Name: Todos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pokopitel
--

SELECT pg_catalog.setval('public."Todos_id_seq"', 1, false);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pokopitel
--

SELECT pg_catalog.setval('public."User_id_seq"', 4, true);


--
-- Name: Todos Todos_pkey; Type: CONSTRAINT; Schema: public; Owner: pokopitel
--

ALTER TABLE ONLY public."Todos"
    ADD CONSTRAINT "Todos_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: pokopitel
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: pokopitel
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Todos Todos_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pokopitel
--

ALTER TABLE ONLY public."Todos"
    ADD CONSTRAINT "Todos_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id);


--
-- PostgreSQL database dump complete
--

