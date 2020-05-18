/**
 * The `Const` type constructor, which wraps its first type argument and ignores its second.
 * That is, `Const<E, A>` is isomorphic to `E` for any `A`.
 *
 * `Const` has some useful instances. For example, the `Applicative` instance allows us to collect results using a `Monoid`
 * while ignoring return values.
 *
 * @since 2.0.0
 */
import { Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { BooleanAlgebra } from './BooleanAlgebra'
import { Bounded } from './Bounded'
import { Contravariant2 } from './Contravariant'
import { Eq } from './Eq'
import { Functor2 } from './Functor'
import { HeytingAlgebra } from './HeytingAlgebra'
import { Monoid } from './Monoid'
import { Ord } from './Ord'
import { Ring } from './Ring'
import { Semigroup } from './Semigroup'
import { Semiring } from './Semiring'
import { Show } from './Show'
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Const: Const<E, A>
  }
}
/**
 * @since 2.0.0
 */
export declare const URI = 'Const'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
/**
 * @since 2.0.0
 */
export declare type Const<E, A> = E & {
  readonly _A: A
}
/**
 * @since 2.0.0
 */
export declare const make: <E, A = never>(e: E) => Const<E, A>
/**
 * @since 2.0.0
 */
export declare function getShow<E, A>(S: Show<E>): Show<Const<E, A>>
/**
 * @since 2.0.0
 */
export declare const getEq: <E, A>(E: Eq<E>) => Eq<Const<E, A>>
/**
 * @since 2.6.0
 */
export declare const getOrd: <E, A>(O: Ord<E>) => Ord<Const<E, A>>
/**
 * @since 2.6.0
 */
export declare const getBounded: <E, A>(B: Bounded<E>) => Bounded<Const<E, A>>
/**
 * @since 2.6.0
 */
export declare const getSemigroup: <E, A>(S: Semigroup<E>) => Semigroup<Const<E, A>>
/**
 * @since 2.6.0
 */
export declare const getMonoid: <E, A>(M: Monoid<E>) => Monoid<Const<E, A>>
/**
 * @since 2.6.0
 */
export declare const getSemiring: <E, A>(S: Semiring<E>) => Semiring<Const<E, A>>
/**
 * @since 2.6.0
 */
export declare const getRing: <E, A>(S: Ring<E>) => Ring<Const<E, A>>
/**
 * @since 2.6.0
 */
export declare const getHeytingAlgebra: <E, A>(H: HeytingAlgebra<E>) => HeytingAlgebra<Const<E, A>>
/**
 * @since 2.6.0
 */
export declare const getBooleanAlgebra: <E, A>(H: BooleanAlgebra<E>) => BooleanAlgebra<Const<E, A>>
/**
 * @since 2.0.0
 */
export declare function getApply<E>(S: Semigroup<E>): Apply2C<URI, E>
/**
 * @since 2.0.0
 */
export declare function getApplicative<E>(M: Monoid<E>): Applicative2C<URI, E>
/**
 * @since 2.0.0
 */
export declare const const_: Functor2<URI> & Contravariant2<URI> & Bifunctor2<URI>
declare const contramap: <A, B>(f: (b: B) => A) => <E>(fa: Const<E, A>) => Const<E, B>
declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Const<E, A>) => Const<E, B>
export {
  /**
   * @since 2.0.0
   */
  contramap,
  /**
   * @since 2.0.0
   */
  map
}
