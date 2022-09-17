import { Mdlib } from '../Mdlib';

describe("Mdlib", () => {
    it("should configure properly", () => {
        const { _converter: c } = Mdlib();
        const expectedOptinos = {
            emoji: true,
            metadata: true,
            stikethrough: true,
            underline: true,
            headerLevelStart: 3,
        };

        Object.entries(expectedOptinos).forEach(([key, value]) =>
            expect(c.getOption(key)).toEqual(value));
    });

    it("should output emojis properly", () => {
        const mdlib = Mdlib();

        expect(mdlib.makeHtml(
            `
---
title: Custom Title
category: test
tags: jest, test
id: test-01
---
this is a :smile: emoji`
        ).html)
            .toEqual('<p>this is a 😄 emoji</p>');
    });

    it("should generate proper metadata", () => {
        const mdlib = Mdlib();

        expect(mdlib.makeHtml(
            `---
title: Custom Title
category: test
tags: jest, test
id: test-01
---
this is a :smile: emoji`
        ).metadata)
            .toEqual({
                title: 'Custom Title',
                category: 'test',
                tags: ['jest', 'test'],
                id: 'test-01'
            });
    });
})
