# Chart source delivery check

Checked 2026-09-05 using direct HTTPS requests, with an eight-second limit per request and eight requests at a time. This is a delivery check, not a new substantive fact audit.

50 unique source URLs were checked: 39 returned 200; 5 returned 403; 6 returned unverified. No confirmed 404 or 410 responses were found. No source URLs or historical content were changed.

HTTP 403 indicates an access restriction or automated-request block; it does not establish a dead link. No 429 rate-limit responses occurred. The six network failures remain unverified for present delivery: a second check through the browsing tool also received gateway errors or timeouts. These pages had been located in search during the original research, but a search index is not proof of current reachability.

| Result | Source |
| --- | --- |
| 403: access blocked | [https://whc.unesco.org/en/list/438/](https://whc.unesco.org/en/list/438/) |
| Network failure; browsing retry also failed | [https://www.chinaknowledge.de/History/Han/han-event-huangjin.html](https://www.chinaknowledge.de/History/Han/han-event-huangjin.html) |
| Network failure; browsing retry also failed | [https://www.chinaknowledge.de/History/Zhou/personsshangyang.html](https://www.chinaknowledge.de/History/Zhou/personsshangyang.html) |
| Network failure; browsing retry also failed | [https://www.chinaknowledge.de/History/Zhou/personszhouyouwang.html](https://www.chinaknowledge.de/History/Zhou/personszhouyouwang.html) |
| Network failure; browsing retry also failed | [https://www.chinaknowledge.de/History/Division/beiwei.html](https://www.chinaknowledge.de/History/Division/beiwei.html) |
| 403: access blocked | [https://soas-repository.worktribe.com/output/383615/the-factional-struggle-of-china-820-850-ad](https://soas-repository.worktribe.com/output/383615/the-factional-struggle-of-china-820-850-ad) |
| 403: access blocked | [https://www.tandfonline.com/doi/abs/10.1080/02549948.2023.2263277](https://www.tandfonline.com/doi/abs/10.1080/02549948.2023.2263277) |
| 403: access blocked | [https://www.tandfonline.com/doi/abs/10.1080/0147037X.2025.2557714](https://www.tandfonline.com/doi/abs/10.1080/0147037X.2025.2557714) |
| 403: access blocked | [https://journals.sagepub.com/doi/pdf/10.1177/18681026221141448](https://journals.sagepub.com/doi/pdf/10.1177/18681026221141448) |
| Network failure; browsing retry also failed | [https://www.chinaknowledge.de/History/Division/personszhugeliang.html](https://www.chinaknowledge.de/History/Division/personszhugeliang.html) |
| Network failure; browsing retry also failed | [https://faculty.risd.edu/bcampbel/Dematte_EarlyDynasties_fromArchaeologica%5B1%5D.pdf](https://faculty.risd.edu/bcampbel/Dematte_EarlyDynasties_fromArchaeologica%5B1%5D.pdf) |

The remaining 39 URLs delivered HTTP 200. A successful response alone does not establish unrestricted full-text access: publisher pages may supply abstracts or descriptions rather than the complete work.
